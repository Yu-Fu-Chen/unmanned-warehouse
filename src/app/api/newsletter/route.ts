import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabase } from '@/lib/supabase-server'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
    }
    const supabase = createServerSupabase()
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: parsed.data.email }])
    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
//前端表單送出（示例）
/*const form = new FormData()
form.append('file', fileInput.files![0])
const res = await fetch('/api/upload', { method: 'POST', body: form })
const json = await res.json()
// json.url 可直接顯示圖片*/
