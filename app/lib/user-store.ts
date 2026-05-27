import 'server-only';
import { supabase } from './supabase';
import type { CartItem } from './CartContext';

export type Address = {
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  pin: string;
  state: string;
};

export type Order = {
  id: string;
  user_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  items: CartItem[];
  address: Address;
  total: number;
  shipping: number;
  status: 'confirmed' | 'dispatched' | 'delivered';
  placed_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  saved_address: Address | null;
  wishlist: string[];
  created_at: string;
};

export async function findUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function findUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createUser(data: {
  name: string;
  email: string;
  password_hash: string;
}): Promise<User> {
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      name: data.name,
      email: data.email.toLowerCase(),
      password_hash: data.password_hash,
      wishlist: [],
      saved_address: null,
    })
    .select()
    .single();
  if (error) throw error;
  return user;
}

export async function updateUser(
  id: string,
  patch: { saved_address?: Address; wishlist?: string[] }
): Promise<void> {
  const { error } = await supabase.from('users').update(patch).eq('id', id);
  if (error) throw error;
}

export async function saveOrder(order: {
  user_id: string | null;
  guest_name?: string | null;
  guest_email?: string | null;
  items: CartItem[];
  address: Address;
  total: number;
  shipping: number;
}): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .insert({ ...order, status: 'confirmed' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('placed_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
