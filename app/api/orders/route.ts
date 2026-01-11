import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { user, cartItems, total } = body;

  // 1. Create user
  const { data: userData } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();

  // 2. Create order
  const { data: order } = await supabase
    .from('orders')
    .insert({
      user_id: userData.id,
      total_amount: total,
    })
    .select()
    .single();

  // 3. Insert order items
  const items = cartItems.map((item: any) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  await supabase.from('order_items').insert(items);

  return NextResponse.json({ success: true, orderId: order.id });
}
