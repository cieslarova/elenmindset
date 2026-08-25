# Podrobný návod: Nastavení OpenClaw s Google Gemini

Tento dokument slouží jako detailní průvodce instalací a konfigurací AI agenta OpenClaw s využitím modelu Gemini a dalších potřebných služeb.

## 1. Získání API klíčů

Před samotnou instalací si připravte následující klíče:

### A. Google Gemini (Model AI)
1. Přejděte na [Google AI Studio](https://aistudio.google.com/).
2. Přihlaste se svým Google účtem.
3. Klikněte na **"Get API key"**.
4. Vytvořte nový API klíč (Create API key in new project).
5. **Klíč si bezpečně uložte.**

### B. OpenWeatherMap (Data o počasí)
1. Registrujte se na [OpenWeatherMap](https://openweathermap.org/api).
2. Přejděte do sekce **API Keys**.
3. Aktivujte si **"One Call API 3.0"** (vyžaduje zadání karty, ale prvních 1000 volání denně je zdarma).
4. **DŮLEŽITÉ**: V sekci "Billing plans" si nastavte **denní limit na 1000**, aby nedošlo k žádnému nechtěnému účtování.
5. Zkopírujte si svůj API klíč.

### C. Discord (Komunikace)
1. Přejděte na [Discord Developer Portal](https://discord.com/developers/applications).
2. Klikněte na **"New Application"** a pojmenujte svého agenta.
3. V sekci **Bot** klikněte na **"Reset Token"** pro získání tokenu bota.
4. Povolte **"Message Content Intent"** v nastavení bota (Privileged Gateway Intents).
5. V sekci **OAuth2 -> URL Generator** vyberte `bot` a `Administrator`, poté použijte vygenerovaný link k pozvání bota na svůj server.

---

## 2. Instalace OpenClaw na Ubuntu 24.04

Spusťte následující příkazy na svém serveru:

### Prerekvizity
```bash
# Instalace Node.js (vyžadováno pro OpenClaw)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs python3-pip git
```

### Stažení a instalace
```bash
git clone https://github.com/OpenClaw/OpenClaw.git
cd OpenClaw
npm install
```

---

## 3. Konfigurace prostředí (.env)

Vytvořte soubor `.env` v kořenovém adresáři OpenClaw:
```bash
nano .env
```

Vložte a upravte následující řádky:
```env
# LLM Konfigurace (Gemini)
PROVIDER=google
GEMINI_API_KEY=vase_gemini_api_klic_z_ai_studio

# Počasí
OPENWEATHER_API_KEY=vase_openweathermap_klic
CITY=Trinec
LAT=49.6776
LON=18.6707

# Discord
DISCORD_TOKEN=vase_discord_bot_token;
DISCORD_CHANNEL_ID=id_kanalu_kam_ma_agent_psat

# Web Server (Cesta k webu eljir.com)
WEB_PATH=/var/www/eljir.com/index.html
```

---

## 4. Spuštění a automatizace

### První spuštění
```bash
npm start
```

### Automatický restart (PM2)
Aby agent běžel i po odhlášení nebo restartu serveru:
```bash
sudo npm install -g pm2
pm2 start npm --name "openclaw-agent" -- start
pm2 save
pm2 startup
```

---

## 5. Další kroky
- **Osobnost**: Upravte soubor `config/agent.json` (nebo ekvivalentní v konkrétní verzi OpenClaw) a definujte instrukce pro agenta (např. "Jsi filozofující mnich z Třince, který komentuje počasí.").
- **Cron**: Nastavte pravidelné spouštění (pokud agent neběží v nekonečné smyčce), aby aktualizoval web např. každou hodinu.
