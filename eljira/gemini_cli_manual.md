# Manual: Instalace Gemini CLI na Ubuntu 24.04 LTS

Tento návod ti pomůže nainstalovat nástroj pro komunikaci s Google Gemini přímo z příkazové řádky tvého serveru.

## 1. Příprava prostředí (Node.js)
Gemini CLI vyžaduje Node.js (doporučeno v20 nebo novější).

1. **Zkontroluj aktuální verzi:**
   ```bash
   node -v
   ```
2. **Pokud nemáš v20+, nainstaluj ji (jako root):**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt-get install -y nodejs
   ```

## 2. Instalace Gemini CLI (jako root)
Nainstalujeme globálně oficiální balíček od Googlu:

```bash
npm install -g @google/gemini-cli
```

## 3. Konfigurace API klíče
Aby CLI mohlo komunikovat s Googlem, potřebuje tvůj API klíč.

1. **Nastav proměnnou prostředí (dočasně):**
   ```bash
   export GEMINI_API_KEY="TVUJ_API_KLIC"
   ```
2. **Nastav trvale (přidej do .bashrc):**
   ```bash
   echo 'export GEMINI_API_KEY="TVUJ_API_KLIC"' >> ~/.bashrc
   source ~/.bashrc
   ```

## 4. Použití
Nyní můžeš Gemini oslovit přímo:

```bash
gemini "Ahoj, jaké je dnes počasí v Třinci?"
```

## 5. Kontext a osobnost (GEMINI.md)
Podobně jako OpenClaw používá `SOUL.md`, toto CLI hledá soubor **`GEMINI.md`**, ze kterého čerpá instrukce pro své chování.

**Kde ho vytvořit:**
- **Globálně:** `~/.gemini/GEMINI.md` (platí pro všechny složky)
- **V projektu:** Přímo v aktuální složce, kde CLI spouštíš.

**Příklad obsahu (vytvoř ho pomocí `nano ~/.gemini/GEMINI.md`):**
```markdown
You are Eljir, a wise guide from Třinec. 
Always respond in standard Czech. 
Focus on weather and local landmarks like Javorový.
```

## 6. Kontrola a změna modelu
Gemini CLI používá ve výchozím nastavení "Auto" nebo Flash.

**Jak zjistit aktuální model:**
1. **Přímo v chatu:** Spusť `gemini` a napiš příkaz:
   ```bash
   /model
   ```
   *(Ukáže ti seznam dostupných modelů a který je aktivní.)*

2. **Přes nastavení:**
   ```bash
   /settings
   ```

**Jak model změnit trvale:**
Přidej si do `~/.bashrc` (podobně jako u API klíče) tento řádek:
```bash
export GEMINI_MODEL="gemini-2.0-flash"
```
*(Poté nezapomeň na `source ~/.bashrc`).*

---

> [!IMPORTANT]
> **Proč tvůj Discord bot neodpovídá?**
> Instalace Gemini CLI je skvělá pro testování klíče, ale pokud OpenClaw neodpovídá na Discordu, problém je pravděpodobně v tom, že:
> 1. Brána (Gateway) neběží pod správným uživatelem.
> 2. Discord plugin se nenahrál (i když je nainstalován).
> 3. V `openclaw.json` je špatné ID kanálu nebo tokenu.
