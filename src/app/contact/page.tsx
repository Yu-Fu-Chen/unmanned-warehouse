"use client";

import { useState } from "react";
import { usePlausible } from 'next-plausible';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const plausible = usePlausible();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError("");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    plausible("contact_submit", { props: { message_len: payload.message.length } });
  
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setOk(json.ok);
      if (!json.ok) setError(json.error ?? "提交失敗，請稍後再試");
      if (json.ok) form.reset();
    } catch (err) {
      setOk(false);
      setError("網路或伺服器發生錯誤");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">聯絡我們</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium">姓名</label>
          <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">訊息</label>
          <textarea
            name="message"
            minLength={10}
            maxLength={2000}
            required
            className="mt-1 h-32 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <button
          disabled={loading}
          className="w-full rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "送出中…" : "送出"}
        </button>
      </form>

      {ok === true && (
        <p className="rounded-xl bg-green-50 p-4 text-green-700">已送出！我們將盡快與你聯繫。</p>
      )}
      {ok === false && <p className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    </div>
  );
}
