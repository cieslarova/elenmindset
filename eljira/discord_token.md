# Návod: Vytvoření Discord Bot Tokenu

Tento manuál vás provede procesem vytvoření aplikace na Discordu, získáním tokenu bota a jeho pozváním na váš server.

## 1. Vytvoření aplikace na Discord Developer Portálu
1. Otevřete [Discord Developer Portal](https://discord.com/developers/applications).
2. Přihlaste se ke svému Discord účtu.
3. Klikněte na tlačítko **"New Application"** v pravém horním rohu.
4. Zadejte název bota (např. "Eljir Weather Agent") a potvrďte souhlas s podmínkami.
5. Klikněte na **"Create"**.

## 2. Nastavení bota a získání Tokenu
1. V levém menu klikněte na sekci **"Bot"**.
2. **Uživatelské jméno bota**: Zde můžete změnit jméno nebo nahrát ikonu (avatara) bota.
3. **Reset Token**: Klikněte na tlačítko **"Reset Token"** (nebo "Copy Token", pokud jej vidíte poprvé).
   - *Poznámka: Discord vám token ukáže pouze jednou. Pokud jej ztratíte, musíte jej resetovat znovu.*
4. **Zkopírujte si token** a bezpečně si ho uložte. Budete ho potřebovat do souboru `.env`.

## 3. Povolení oprávnění (Intents)
Aby agent mohl číst zprávy a reagovat na ně, musíte povolit tzv. "Intents":
1. Stále v sekci **"Bot"**, sjeďte dolů k části **"Privileged Gateway Intents"**.
2. Zapněte přepínač **"Message Content Intent"**.
3. (Doporučeno) Zapněte také **"Presence Intent"** a **"Server Members Intent"**.
4. Klikněte na **"Save Changes"**.

## 4. Pozvání bota na server (OAuth2)
1. V levém menu klikněte na **"OAuth2"** -> **"URL Generator"**.
2. V sekci **Scopes** zaškrtněte:
   - `bot`
   - `applications.commands` (pro budoucí lomítkové příkazy)
3. V sekci **Bot Permissions** (která se objeví dole) zaškrtněte:
   - `Administrator` (pro nejjednodušší nastavení v začátku)
   - *Nebo vyberte konkrétní práva: Read Messages, Send Messages, Embed Links, Read Message History.*
4. Dole v sekci **Generated URL** zkopírujte vygenerovaný odkaz.
5. Vložte tento odkaz do prohlížeče, vyberte svůj Discord server a potvrďte autorizaci.

## 5. Získání ID kanálu (DISCORD_CHANNEL_ID)
Agent musí vědět, do jakého konkrétního kanálu má psát:
1. V Discordu otevřete **"User Settings"** (ozubené kolečko dole u jména).
2. Jděte do **"Advanced"** a zapněte **"Developer Mode"**.
3. Nyní klikněte pravým tlačítkem na textový kanál na vašem serveru, kam má agent psát.
4. Vyberte **"Copy Channel ID"**. Toto ID vložte do souboru `.env`.

---
**VAROVÁNÍ**: Nikdy svůj Discord Token nesdílejte veřejně (např. na GitHubu). Kdokoliv s tímto tokenem může ovládat vašeho bota a potenciálně poškodit váš server.
