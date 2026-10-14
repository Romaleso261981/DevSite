export const GA_MEASUREMENT_ID = "G-ZX5S1SX5TX";
export const GOOGLE_ADS_ID = "AW-18512379903";

/**
 * Event snippet for «Надсилання форми devsite».
 * Google Ads: gtag('event', 'conversion', {'send_to': 'AW-18512379903/aAM8CKLSvJwdEP__sftE'});
 */
export const GOOGLE_ADS_CONVERSION_LABEL = "aAM8CKLSvJwdEP__sftE";

const LEAD_DEDUPE_MS = 2000;
let lastLeadAt = 0;

type ConsentCategory = "analytics" | "advertisement";

type CookieYesConsent = {
  categories?: Partial<Record<ConsentCategory, boolean>>;
};

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    getCkyConsent?: () => CookieYesConsent;
  }
}

/** Runs before CookieYes and the Google tag so hits wait for a consent update. */
export const GOOGLE_CONSENT_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
`;

/** One gtag.js load, then both destinations. */
export const GOOGLE_TAG_CONFIG = `
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
gtag('config', '${GOOGLE_ADS_ID}');
`;

function hasConsent(category: ConsentCategory): boolean {
  if (typeof window.getCkyConsent !== "function") return false;
  try {
    return window.getCkyConsent().categories?.[category] === true;
  } catch {
    return false;
  }
}

/** Call only after the server confirms the lead was delivered. */
export function trackGenerateLead(): void {
  if (typeof window.gtag !== "function") return;

  const analyticsAllowed = hasConsent("analytics");
  const adsAllowed =
    hasConsent("advertisement") && GOOGLE_ADS_CONVERSION_LABEL.length > 0;
  if (!analyticsAllowed && !adsAllowed) return;

  const now = Date.now();
  if (now - lastLeadAt < LEAD_DEDUPE_MS) return;
  lastLeadAt = now;

  if (analyticsAllowed) {
    window.gtag("event", "generate_lead", {
      form_id: "contact",
      form_name: "project_request",
      lead_source: "website",
      transport_type: "beacon",
    });
  }

  if (adsAllowed) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      transport_type: "beacon",
    });
  }
}
