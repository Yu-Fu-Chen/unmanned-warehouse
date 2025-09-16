import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'

export const runtime = 'nodejs' // 確保是 Node 環境（非 edge），以便處理檔案

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'no file' }, { status: 400 })
    }
    // 基礎驗證
    if (file.size > 5 * 1024 * 1024) { // 5MB
      return NextResponse.json({ ok: false, error: 'too large' }, { status: 400 })
    }

    const bytes = new Uint8Array(await file.arrayBuffer())
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
    const key = `public-assets/${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}.${ext}`

    const supabase = createServerSupabase()
    const { error } = await supabase.storage
      .from('public-assets')
      .upload(key.replace('public-assets/', ''), bytes, {
        contentType: file.type || 'application/octet-stream',
        upsert: false
      })

    if (error) throw error

    // 公開 bucket 可直接組 URL（Supabase 會提供 public URL）
    const { data } = supabase.storage.from('public-assets').getPublicUrl(key.replace('public-assets/', ''))

    return NextResponse.json({ ok: true, key, url: data.publicUrl })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
