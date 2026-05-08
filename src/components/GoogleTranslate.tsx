import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const countryToLang: Record<string, string> = {
  UG: "en", KE: "sw", TZ: "sw", RW: "fr", CD: "fr", SS: "en",
  FR: "fr", DE: "de", ES: "es", IT: "it", PT: "pt", JP: "ja", CN: "zh-CN", KR: "ko", AR: "ar", IN: "hi",
};

async function detectCountry(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return data.country_code || null;
  } catch {
    return null;
  }
}

export default function GoogleTranslate() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (document.getElementById("google-translate-script")) {
      setInitialized(true);
      return;
    }

    window.googleTranslateElementInit = async () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,sw,fr,rw,lg,ar,de,es,it,pt,ja,zh-CN,ko,hi",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setInitialized(true);

      const country = await detectCountry();
      if (country && countryToLang[country] && countryToLang[country] !== "en") {
        setTimeout(() => {
          const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
          if (select) {
            select.value = countryToLang[country];
            select.dispatchEvent(new Event("change"));
          }
        }, 1500);
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <Languages className="w-4 h-4 text-accent shrink-0" />
      <div
        id="google_translate_element"
        className="[&_.goog-te-gadget]:!text-xs [&_.goog-te-gadget]:!m-0 [&_.goog-te-combo]:rounded-md [&_.goog-te-combo]:border [&_.goog-te-combo]:border-accent/30 [&_.goog-te-combo]:bg-transparent [&_.goog-te-combo]:px-2 [&_.goog-te-combo]:py-1 [&_.goog-te-combo]:text-xs [&_.goog-te-combo]:text-foreground [&_.goog-te-gadget-simple]:bg-transparent [&_.goog-te-gadget-simple]:border-none [&_span]:!text-xs [&_.goog-te-gadget]:!font-body [&_a]:!hidden [&_.goog-te-banner-frame]:!hidden"
      />
    </div>
  );
}
