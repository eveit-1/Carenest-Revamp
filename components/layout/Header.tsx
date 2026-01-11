'use client';

import React from 'react';
import { Navbar } from './Navbar';

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <Navbar />
    </header>
  );
}
