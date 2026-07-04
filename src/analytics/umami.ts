const UMAMI_SCRIPT_ID = "umami-analytics";

export function setupUmamiAnalytics(documentRef: Document = document) {
  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL;
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;

  if (!scriptUrl || !websiteId || documentRef.getElementById(UMAMI_SCRIPT_ID)) {
    return;
  }

  const script = documentRef.createElement("script");
  script.id = UMAMI_SCRIPT_ID;
  script.defer = true;
  script.src = scriptUrl;
  script.dataset.websiteId = websiteId;

  documentRef.head.appendChild(script);
}
