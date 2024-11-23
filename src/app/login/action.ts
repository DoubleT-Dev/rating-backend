'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(
  formData: FormData
) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      throw new Error(error?.message)
    }

    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
  } catch (error : any) {
    // Handle specific error types
    if (error.message.includes('Invalid email or password')) {
      // Display a specific error message to the user
    } else {
      // Handle general errors
    }

    throw error
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)
console.log(error);
  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export default async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/login", "layout");
  redirect('/login');
}