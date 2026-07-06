"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

// With a single root layout the <html lang> attribute is static, so keep it in
// sync with the active locale on client-side navigation between languages.
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
