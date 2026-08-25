# Plán implementace: AI Agent pro sledování počasí (Třinec)

Tento dokument obsahuje detailní plán pro zprovoznění autonomního AI agenta na serveru Ubuntu 24.04 LTS, který bude sledovat počasí v Třinci, komentovat jej na webu eljir.com a komunikovat přes Discord.

## Navrhované kroky a vylepšení

V rámci brainstormingu navrhuji následující doplnění:
- **Výběr zdroje dat**: Použít OpenWeatherMap API pro přesná data pro Třinec. (1000 volání zdarma denně)
- **Strategie komentování**: Definovat "osobnost" agenta (např. vtipný glosátor, filozofující mnich), aby jeho meditace měly konzistentní tón.
- **Monitoring**: Nastavit základní monitoring (např. UptimeRobot), aby bylo jasné, zda agent i web běží.
- **Zálohování**: Skript pro pravidelné zálohování konfigurace a historie meditací.

---

## 1. Příprava Linux serveru (Ubuntu 24.04 LTS)
1. **Základní aktualizace**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
2. **Vytvoření dedikovaného uživatele**: (Doporučeno pro bezpečnost)
   ```bash
   sudo adduser openclaw
   # Přidání do skupiny sudo (pokud bude potřeba instalovat balíčky)
   sudo usermod -aG sudo openclaw
   ```
3. **Zabezpečení serveru**:
   - **SSH**: Změna portu (volitelné), zákaz přihlášení roota, vynucení SSH klíčů.
   - **Firewall (UFW)**: 
     ```bash
     sudo ufw allow 22/tcp
     sudo ufw allow 80/tcp
     sudo ufw allow 443/tcp
     sudo ufw enable
     ```
   - **Fail2Ban**: Instalace a konfigurace pro ochranu proti brute-force útokům. Podrobný postup v [fail2ban_nastaveni.md](file:///c:/Users/acern50/Documents/code/agenteljira/fail2ban_nastaveni.md).
     ```bash
     sudo apt install fail2ban -y
     ```

## 2. Webový server a doména eljir.com
1. **Instalace Nginx**:
   ```bash
   sudo apt install nginx -y
   ```
2. **Konfigurace virtuálního hostitele**: Nastavení `/etc/nginx/sites-available/eljir.com`.
3. **HTTPS a certifikát**:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d eljir.com
   ```

## 3. Instalace a konfigurace OpenClaw
1. **Prerekvizity**: Instalace Pythonu, Node.js a Git (podle aktuální dokumentace OpenClaw).
2. **Klonování repozitáře**:
   ```bash
   git clone https://github.com/OpenClaw/OpenClaw.git
   cd OpenClaw
   ```
3. **Nastavení prostředí**: Vytvoření `.env` souboru s API klíči (např. pro Claude nebo GPT-4).
4. **AgentSkills**: Konfigurace dovedností pro čtení externích dat a publikování na web.

## 4. Logika agenta a integrace počasí
1. **Zdroj dat**: Agent bude využívat Weather API (např. OpenWeatherMap) pro získání aktuálního stavu a předpovědi pro Třinec.
2. **Generování obsahu**: Agent obdrží data a na základě nastavené osobnosti vygeneruje text ("meditaci").
3. **Aktualizace webu**: Automatický zápis vygenerovaného obsahu do HTML/Markdown souboru, který Nginx servíruje na eljir.com.

## 5. Integrace s Discordem
1. **Discord Bot**: Vytvoření bot aplikace na Discord Developer Portálu a získání Tokenu.
2. **Propojení**: Nastavení OpenClaw tak, aby synchronizoval své meditace i do určeného kanálu na Discordu.

---

## Plán ověření (Verification Plan)

### Automatizované testy
- **Kontrola dostupnosti**: `curl -I https://eljir.com` (ověření HTTP 200 a platnosti SSL).
- **Test API**: Spuštění modulu pro získání dat o počasí a ověření správnosti JSON výstupu.
- **Fail2Ban**: Kontrola stavu ochrany příkazem `sudo fail2ban-client status sshd`.
- **HTTPS**: Test v prohlížeči na adrese `https://eljir.com` (měla by být vidět zelená ikona zámku).

### Manuální ověření
1. **Discord**: Test interakce s agentem v reálném čase.
2. **Web**: Kontrola, zda se text meditace správně renderuje a aktualizuje.
3. **Bezpečnost**: Ověření, že firewall blokuje nepotřebné porty.
