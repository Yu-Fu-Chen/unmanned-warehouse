"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUrl("");

    if (!file) {
      setError("請先選擇檔案");
      setLoading(false);
      return;
    }

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "上傳失敗");
      setUrl(json.url);
    } catch (err: any) {
      setError(err.message ?? "上傳失敗");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">上傳圖片（Supabase Storage）</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button
          disabled={loading}
          className="w-full rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "上傳中…" : "上傳並取得連結"}
        </button>
      </form>

      {url && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">檔案網址：</p>
          <a href={url} target="_blank" className="break-all text-blue-600 hover:underline" rel="noreferrer">
            {url}
          </a>
          <div className="rounded-xl border p-4">
            {/* 立即預覽 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="uploaded" className="max-h-80" />
          </div>
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    </div>
  );
}
