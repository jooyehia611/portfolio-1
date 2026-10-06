import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'en' | 'ar';

const LocaleContext = createContext<{ locale: Locale; setLocale: (value: Locale) => void }>({
  locale: 'en', setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

export const useTranslation = <T,>(en: T, ar: T): T => (useLocale().locale === 'ar' ? ar : en);

export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (initialLocale) return initialLocale;
    try { return localStorage.getItem('portfolio-locale') === 'ar' ? 'ar' : 'en'; } catch { return 'en'; }
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.title = locale === 'ar' ? 'يوسف يحيى — مطور Backend' : 'Yousef Yehia — Backend Developer';
    document.querySelector('meta[name="description"]')?.setAttribute('content', locale === 'ar'
      ? 'يوسف يحيى عبد النبي، مطور Backend متخصص في Laravel وPHP وواجهات API والتجارة الإلكترونية.'
      : 'Yousef Yehia Abd Elnaby — Senior Backend Developer. Laravel, PHP, REST APIs, MySQL, Magento 2, and WordPress.');
    try { localStorage.setItem('portfolio-locale', locale); } catch { /* Storage may be unavailable. */ }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
