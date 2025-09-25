import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

const securityHeaders = [
  // 嚴格內容安全政策（請依你的實際外部服務調整）
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 允許外部腳本：plausible
      "script-src 'self' https://plausible.io",
      // 若你有 inline style（Tailwind JIT 常見 class，不影響），保留 'unsafe-inline'
      "style-src 'self' 'unsafe-inline'",
      // 影像來源（含 data: / blob: 方便預覽）
      "img-src 'self' data: blob: https:",
      // XHR/Fetch 允許連到 supabase / plausible
      "connect-src 'self' https://plausible.io https://*.supabase.co https://*.supabase.net",
      // 字體/媒體等可按需加上
      "font-src 'self' https:",
      "media-src 'self' https: blob:",
      // 防止被其他站用 <iframe> 嵌入
      "frame-ancestors 'self'",
      // 禁止修改 base URL
      "base-uri 'self'"
    ].join('; ')
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  // HSTS（只在 HTTPS 下開啟；本機先不要）：
  // { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // 權限策略（按需求開關硬體功能）
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
];

module.exports = {
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders }
    ];
  }
};
