import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/* ----------------------------------------
   POST /api/users
-----------------------------------------*/

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    /* ================================
       FIND USER BY PHONE
    ================================= */
    if (action === 'find') {
      const { phone } = body;

      if (!phone) {
        return NextResponse.json({ error: 'Phone required' }, { status: 400 });
      }

      const { data, error } = await supabase
        .from('users')
        .select('id, name, dob, gender, email, phone')
        .eq('phone', phone)
        .single();

      if (error || !data) {
        return NextResponse.json({ user: null });
      }

      return NextResponse.json({ user: data });
    }

    /* ================================
       REGISTER USER
    ================================= */
    if (action === 'register') {
      const { name, phone, dob, gender, email } = body;

      if (!name || !phone || !dob || !gender) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      // 🔍 Check if already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('phone', phone)
        .single();

      if (existingUser) {
        return NextResponse.json({
          userId: existingUser.id,
          alreadyExists: true,
        });
      }

      // ➕ Insert new user
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([
          { name, phone, dob, gender, email },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);
        return NextResponse.json(
          { error: 'Failed to create user' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        userId: newUser.id,
        alreadyExists: false,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
