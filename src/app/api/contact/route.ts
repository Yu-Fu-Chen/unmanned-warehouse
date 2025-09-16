import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabase } from '@/lib/supabase-server'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
    }
    const supabase = createServerSupabase()
    const { error } = await supabase
      .from('contact_messages')
      .insert([parsed.data])
    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
// 例如在某個客製化 hook 或頁面提交時：
await fetch('/api/contact', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
})
