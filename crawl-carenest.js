const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'https://www.carenest.in/';
const visitedUrls = new Set();
const siteMap = {
  pages: [],
  navigation: [],
  footerLinks: [],
  components: [],
  designSystem: {
    colors: new Set(),
    fonts: [],
    spacing: [],
    buttons: [],
  },
};

async function extractPageData(page, url) {
  console.log(`Analyzing: ${url}`);
  
  // Wait for network to be idle
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Additional wait for dynamic content

  // Extract basic page info
  const pageData = {
    url,
    title: await page.title(),
    metaTags: {},
    sections: [],
    links: [],
    textContent: '',
    screenshots: {},
  };

  // Extract meta tags
  const metaTags = await page.$$eval('meta', (metas) => {
    const result = {};
    metas.forEach((meta) => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      const content = meta.getAttribute('content');
      if (name && content) {
        result[name] = content;
      }
    });
    return result;
  });
  pageData.metaTags = metaTags;

  // Extract visible text content
  pageData.textContent = await page.evaluate(() => {
    return document.body.innerText;
  });

  // Extract all links
  const links = await page.$$eval('a[href]', (anchors) => {
    return anchors.map((a) => ({
      href: a.getAttribute('href'),
      text: a.innerText.trim(),
      isExternal: a.href.startsWith('http') && !a.href.includes('carenest.in'),
    }));
  });
  pageData.links = links;

  // Identify major sections
  const sections = await page.evaluate(() => {
    const result = [];
    const selectors = [
      'header',
      'nav',
      'main',
      'section',
      'footer',
      '[class*="hero"]',
      '[class*="Hero"]',
      '[class*="service"]',
      '[class*="Service"]',
      '[class*="cta"]',
      '[class*="CTA"]',
      '[id*="hero"]',
      '[id*="Hero"]',
    ];
    
    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        const id = el.id || '';
        const className = el.className || '';
        const text = el.innerText.substring(0, 100);
        result.push({
          tag: el.tagName.toLowerCase(),
          id,
          className: typeof className === 'string' ? className : className.toString(),
          textPreview: text,
        });
      });
    });
    return result;
  });
  pageData.sections = sections;

  // Extract design system information
  const designData = await page.evaluate(() => {
    const result = {
      colors: new Set(),
      fonts: [],
      buttons: [],
    };

    // Extract colors from computed styles
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const textColor = style.color;
      const borderColor = style.borderColor;
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        result.colors.add(bgColor);
      }
      if (textColor && textColor !== 'rgba(0, 0, 0, 0)') {
        result.colors.add(textColor);
      }
      if (borderColor && borderColor !== 'rgba(0, 0, 0, 0)') {
        result.colors.add(borderColor);
      }

      // Extract font families
      const fontFamily = style.fontFamily;
      if (fontFamily) {
        result.fonts.push(fontFamily);
      }

      // Identify buttons
      if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button' || 
          (el.className && (el.className.includes('button') || el.className.includes('btn')))) {
        result.buttons.push({
          text: el.innerText.trim(),
          className: el.className,
          styles: {
            backgroundColor: style.backgroundColor,
            color: style.color,
            fontSize: style.fontSize,
            padding: style.padding,
            borderRadius: style.borderRadius,
          },
        });
      }
    });

    return {
      colors: Array.from(result.colors),
      fonts: [...new Set(result.fonts)],
      buttons: result.buttons,
    };
  });

  // Capture screenshots
  const screenshotDir = path.join(__dirname, 'carenest-screenshots');
  await fs.mkdir(screenshotDir, { recursive: true });
  
  const urlSlug = url.replace(BASE_URL, '').replace(/\//g, '_') || 'homepage';
  pageData.screenshots = {
    aboveFold: path.join(screenshotDir, `${urlSlug}-above-fold.png`),
    fullPage: path.join(screenshotDir, `${urlSlug}-full.png`),
  };

  await page.screenshot({ path: pageData.screenshots.aboveFold, fullPage: false });
  await page.screenshot({ path: pageData.screenshots.fullPage, fullPage: true });

  // Update design system
  designData.colors.forEach((color) => siteMap.designSystem.colors.add(color));
  siteMap.designSystem.fonts.push(...designData.fonts);
  siteMap.designSystem.buttons.push(...designData.buttons);

  return pageData;
}

async function crawlSite() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });
  const page = await context.newPage();

  try {
    // Start with homepage
    const homepageData = await extractPageData(page, BASE_URL);
    siteMap.pages.push(homepageData);

    // Extract navigation links
    const navLinks = await page.$$eval('nav a[href], header a[href]', (anchors) => {
      return anchors.map((a) => ({
        href: a.getAttribute('href'),
        text: a.innerText.trim(),
      }));
    });
    siteMap.navigation = navLinks;

    // Extract footer links
    const footerLinks = await page.$$eval('footer a[href]', (anchors) => {
      return anchors.map((a) => ({
        href: a.getAttribute('href'),
        text: a.innerText.trim(),
      }));
    });
    siteMap.footerLinks = footerLinks;

    // Collect all internal URLs
    const allLinks = [...homepageData.links];
    const internalUrls = new Set();
    
    allLinks.forEach((link) => {
      if (link.href) {
        let fullUrl = link.href;
        if (fullUrl.startsWith('/')) {
          fullUrl = BASE_URL + fullUrl.substring(1);
        }
        if (fullUrl.startsWith(BASE_URL) && !link.isExternal) {
          internalUrls.add(fullUrl.split('#')[0].split('?')[0]); // Remove hash and query params
        }
      }
    });

    // Crawl each internal page
    console.log(`Found ${internalUrls.size} internal pages to crawl...`);
    for (const url of internalUrls) {
      if (!visitedUrls.has(url) && url !== BASE_URL) {
        visitedUrls.add(url);
        try {
          const pageData = await extractPageData(page, url);
          siteMap.pages.push(pageData);
        } catch (error) {
          console.error(`Error crawling ${url}:`, error.message);
        }
      }
    }

    // Process design system
    siteMap.designSystem.colors = Array.from(siteMap.designSystem.colors);
    siteMap.designSystem.fonts = [...new Set(siteMap.designSystem.fonts)];

    // Generate report
    const report = {
      siteMap: {
        totalPages: siteMap.pages.length,
        pages: siteMap.pages.map((p) => ({
          url: p.url,
          title: p.title,
          metaTags: p.metaTags,
          sections: p.sections.length,
          links: p.links.length,
        })),
      },
      navigation: {
        mainNav: siteMap.navigation,
        footerLinks: siteMap.footerLinks,
      },
      designSystem: {
        colors: siteMap.designSystem.colors.slice(0, 20), // Limit to top 20
        fonts: siteMap.designSystem.fonts.slice(0, 10), // Limit to top 10
        buttons: siteMap.designSystem.buttons.slice(0, 10), // Sample buttons
      },
      summary: {
        crawledAt: new Date().toISOString(),
        totalPages: siteMap.pages.length,
        totalLinks: siteMap.pages.reduce((sum, p) => sum + p.links.length, 0),
        uniqueColors: siteMap.designSystem.colors.length,
        uniqueFonts: siteMap.designSystem.fonts.length,
      },
    };

    // Save report
    await fs.writeFile(
      'CARENEST_CRAWL_REPORT.json',
      JSON.stringify(report, null, 2)
    );

    // Generate markdown report
    const markdownReport = generateMarkdownReport(report);
    await fs.writeFile('CARENEST_CRAWL_REPORT.md', markdownReport);

    console.log('\n✅ Crawl completed!');
    console.log(`📄 Report saved to: CARENEST_CRAWL_REPORT.json`);
    console.log(`📝 Markdown report saved to: CARENEST_CRAWL_REPORT.md`);
    console.log(`📸 Screenshots saved to: carenest-screenshots/`);

  } finally {
    await browser.close();
  }
}

function generateMarkdownReport(report) {
  let md = `# CareNest Website Crawl Report\n\n`;
  md += `**Generated:** ${report.summary.crawledAt}\n\n`;
  md += `## Summary\n\n`;
  md += `- **Total Pages Crawled:** ${report.summary.totalPages}\n`;
  md += `- **Total Links Found:** ${report.summary.totalLinks}\n`;
  md += `- **Unique Colors:** ${report.summary.uniqueColors}\n`;
  md += `- **Unique Fonts:** ${report.summary.uniqueFonts}\n\n`;

  md += `## Site Map\n\n`;
  report.siteMap.pages.forEach((page, index) => {
    md += `### ${index + 1}. ${page.title}\n`;
    md += `- **URL:** ${page.url}\n`;
    md += `- **Sections:** ${page.sections}\n`;
    md += `- **Links:** ${page.links}\n`;
    if (Object.keys(page.metaTags).length > 0) {
      md += `- **Meta Tags:** ${Object.keys(page.metaTags).join(', ')}\n`;
    }
    md += `\n`;
  });

  md += `## Navigation Structure\n\n`;
  md += `### Main Navigation\n`;
  report.navigation.mainNav.forEach((link) => {
    md += `- [${link.text}](${link.href})\n`;
  });

  md += `\n### Footer Links\n`;
  report.navigation.footerLinks.forEach((link) => {
    md += `- [${link.text}](${link.href})\n`;
  });

  md += `\n## Design System\n\n`;
  md += `### Color Palette\n`;
  report.designSystem.colors.forEach((color) => {
    md += `- \`${color}\`\n`;
  });

  md += `\n### Typography\n`;
  report.designSystem.fonts.forEach((font) => {
    md += `- ${font}\n`;
  });

  md += `\n### Button Styles\n`;
  report.designSystem.buttons.forEach((btn, index) => {
    md += `#### Button ${index + 1}\n`;
    md += `- **Text:** ${btn.text}\n`;
    md += `- **Background:** ${btn.styles.backgroundColor}\n`;
    md += `- **Color:** ${btn.styles.color}\n`;
    md += `- **Font Size:** ${btn.styles.fontSize}\n`;
    md += `\n`;
  });

  return md;
}

// Run the crawler
crawlSite().catch(console.error);
