// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const WINDOW_MS = 60_000; // 1 分鐘
const LIMIT = 10;         // 每 IP 每窗口最多 10 次

type Rec = { count: number; ts: number };
const hits = new Map<string, Rec>(); // 注意：只適合本機/低流量測試

function getClientIp(req: NextRequest): string {
  // 代理常見頭：在 Vercel/反向代理/雲端都會帶
  const xf = req.headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0].trim();

  const xr = req.headers.get('x-real-ip');
  if (xr) return xr;

  // 本機開發回退
  return '127.0.0.1';
}

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;

  // 只保護這幾個 API
  if (
    !(p.startsWith('/api/contact') ||
      p.startsWith('/api/newsletter') ||
      p.startsWith('/api/upload'))
  ) {
    return NextResponse.next();
  }

  const ip = getClientIp(req);
  const now = Date.now();
  const rec = hits.get(ip);

  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return NextResponse.next();
  }

  if (rec.count >= LIMIT) {
    return new NextResponse(JSON.stringify({ ok: false, error: 'rate_limited' }), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    });
  }

  rec.count++;
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
