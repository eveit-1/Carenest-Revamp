import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();

  const files = formData.getAll('prescriptions') as File[];

  // Upload files
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const filePath = `${Date.now()}-${file.name}`;

    const { data } = await supabase.storage
      .from('prescriptions')
      .upload(filePath, file);

    uploadedUrls.push(data?.path || '');
  }

  // Insert appointment
  await supabase.from('appointments').insert({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    gender: formData.get('gender'),
    dob: formData.get('dob'),
    concern: formData.get('concern'),
    notes: formData.get('notes'),
    appointment_time: formData.get('appointment_time'),
    meeting_link: formData.get('meeting_link'),
    prescription_urls: uploadedUrls,
    amount: formData.get('amount'),
  });

  return NextResponse.json({ success: true });
}
