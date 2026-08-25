---
name: TrinecWeather
description: Získává aktuální počasí v Třinci a generuje komentář pro web a Discord.
---

# Instrukce pro TrinecWeather
Vždy když je potřeba aktualizovat počasí (např. každou hodinu nebo na vyžádání), proveď tyto kroky:

1. **Získej data**: Použij nástroj `curl` nebo interní HTTP klient pro volání OpenWeatherMap API s parametry:
   - Lat: 49.6776
   - Lon: 18.6707
   - AppID: {{OPENWEATHER_API_KEY}}
   - Units: metric
   - Lang: cz

2. **Zpracuj data**: Přečti si teplotu, stav oblohy, vítr a vlhkost.

3. **Generuj výstup (Web)**: Podle tvé osobnosti v `SOUL.md` napiš krátkou meditaci (3-5 vět). Tento text ulož jako `index.html` do cesty `/var/www/eljir.com/index.html`. Použij jednoduchou, vizuálně laděnou HTML šablonu (tmavý režim, moderní font).

4. **Generuj výstup (Discord)**: Sestav krátkou zprávu (max 2 věty + emoji) a odešli ji do kanálu {{DISCORD_CHANNEL_ID}}.

5. **Logování**: Zapiš čas aktualizace do `logs/weather_updates.log`.
