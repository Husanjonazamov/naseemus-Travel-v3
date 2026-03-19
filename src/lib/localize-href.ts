const SUPPORTED_LOCALES = ["uz", "ru", "en"] as const;

export function getBrowserLocale(defaultLocale = "en") {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const pathnameLocale = window.location.pathname.split("/")[1];
  if (SUPPORTED_LOCALES.includes(pathnameLocale as (typeof SUPPORTED_LOCALES)[number])) {
    return pathnameLocale;
  }

  const cookieLocale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("NEXT_LOCALE="))
    ?.split("=")[1];

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as (typeof SUPPORTED_LOCALES)[number])) {
    return cookieLocale;
  }

  return defaultLocale;
}

export function localizeHref(locale: string, href: string) {
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (href.startsWith("#")) {
    return `/${locale}${href}`;
  }

  const [path, hash = ""] = href.split("#");
  const normalizedPath = path === "/" ? "" : path.replace(/^\/(uz|ru|en)(?=\/|$)/, "");

  if (!normalizedPath) {
    return hash ? `/${locale}#${hash}` : `/${locale}`;
  }

  return hash ? `/${locale}${normalizedPath}#${hash}` : `/${locale}${normalizedPath}`;
}
