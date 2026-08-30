(async function logVisitor() {
  // Prevent logging during local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return;
  }

  // Session storage check to avoid logging the same visitor repeatedly within 30 minutes
  const lastLogged = sessionStorage.getItem('visited_session');
  if (lastLogged) return;

  const SUPABASE_URL = "https://yjzksskdtqabznonupzd.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqemtzc2tkdHFhYnpub251cHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwOTQyMjMsImV4cCI6MjEwMzY3MDIyM30.I-IGUGdQcDVG_24bIrtwpMgise5Ezs-HSisebtGzxJY";

  let geoData = { city: 'Unknown', country: 'Unknown' };

  // Fetch non-invasive geolocation info via ipapi.co
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      geoData = {
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown'
      };
    }
  } catch (err) {
    console.warn("Geo lookup bypassed");
  }

  const payload = {
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || 'Direct Link',
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || 'Unknown',
    user_agent: navigator.userAgent,
    city: geoData.city,
    country: geoData.country
  };

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/visitor_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });

    // Mark session as logged
    sessionStorage.setItem('visited_session', 'true');
  } catch (error) {
    console.error("Tracker error:", error);
  }
})();
