import { useState, useEffect } from "react";

interface LocationData {
  city: string;
  country: string;
  countryCode: string;
  greeting: string;
  flag: string;
}

export const useVisitorLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        const country = data.country_name ?? "your country";
        const city = data.city ?? "";
        const countryCode = data.country_code ?? "";

        // 🌍 Greeting based on country
        const greetingMap: Record<string, string> = {
          IN: "நமஸ்கார்",   // Tamil/India
          US: "Hey",
          GB: "Hello",
          DE: "Hallo",
          FR: "Bonjour",
          JP: "こんにちは",
          KR: "안녕하세요",
          CN: "你好",
          SA: "مرحبا",
          BR: "Olá",
          ES: "Hola",
          IT: "Ciao",
          RU: "Привет",
          NL: "Hoi",
          AU: "G'day",
        };

        const greeting = greetingMap[countryCode] ?? "Hello";

        // 🏳️ Flag emoji from country code
        const flag = countryCode
          ? countryCode
              .toUpperCase()
              .split("")
              .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
              .join("")
          : "🌍";

        setLocation({ city, country, countryCode, greeting, flag });
      } catch {
        setLocation({
          city: "",
          country: "",
          countryCode: "",
          greeting: "Hello",
          flag: "🌍",
        });
      }
    };

    fetchLocation();
  }, []);

  return location;
};
