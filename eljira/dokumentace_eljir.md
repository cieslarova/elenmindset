# Komplexní dokumentace webu eljir.com (Duch Třince)

## 1. Úvod a celková koncepce
- **Název webu:** Duch Třince
- **URL:** https://eljir.com
- **Hlavní téma:** Lokální denní bulletin zaměřený na region Třince a Beskyd.
- **Koncept:** Web kombinuje regionální patriotismus, předpověď počasí, svátky, astrologii a jemnou satiru. Unikátním prvkem je střet dvou rozdílných narativů:
  - **Elen (Poetický a spirituální pohled):** Zastupuje "Ducha Třince". Píše o hvězdách, náladě krajiny a horoskopech, používá vzletný a pozitivní jazyk.
  - **Jiří / Třinecký realista (Sarkastický a pragmatický pohled):** Kontrastuje s poetikou břitkými poznámkami ze života obyčejného obyvatele Třince (často směřujícími na pivo či práci ve "Werku").

## 2. Architektura a technologický stack
Web je postaven jako statická HTML stránka bez nutnosti backendových operací na straně klienta.
- **HTML:** Čisté HTML5 se sémantickými prvky.
- **CSS:** Vanilla CSS3 implementované přímo v hlavičce (interní styly).
- **JavaScript:** Na frontendu není použit žádný JavaScript. Veškerá interaktivita (rozbalování horoskopů) je řešena pomocí nativních HTML tagů `<details>` a `<summary>`.
- **Generování obsahu:** S ohledem na strukturu dat a odkazy na starší verze (např. `archiv_2026-07-01.html`) je web s největší pravděpodobností generován automatizovaně, dost možná pomocí nějakého skriptu nebo LLM agentů, kteří každý den vytvářejí nový obsah podle aktuálního data.

## 3. Detailní rozbor uživatelského rozhraní (UI/UX)
Design webu je koncipován jako moderní "karta" umístěná uprostřed obrazovky, využívající prvky **Glassmorphismu**.

### 3.1. Barevná paleta a typografie
- **Tmavý režim (Dark Theme):** Definovaný v CSS proměnných v bloku `:root`.
  - Pozadí (`--bg-color`): Tmavě modrá/šedá `#0f172a`.
  - Text (`--text-color`): Světlá šedá `#f1f5f9`.
  - Akcent (`--accent-color`): Jasně modrá `#38bdf8` používaná pro nadpisy a interaktivní prvky.
  - Pozadí karty (`--card-bg`): Poloprůhledná barva `rgba(30, 41, 59, 0.7)`.
- **Fonty:** Importovány z Google Fonts.
  - **Inter:** Použit pro běžný text, zajišťuje vynikající čitelnost.
  - **Outfit:** Použit pro nadpisy (H1, názvy sekcí), přidává moderní a "hladký" vzhled.

### 3.2. Rozložení stránky a komponenty
1. **Hlavní kontejner (`.container`):**
   - Vycentrovaný na střed pomocí Flexboxu.
   - Využívá `backdrop-filter: blur(12px)` pro vytvoření efektu mléčného skla.
   - Obsahuje nástupní animaci `@keyframes fadeIn` (plynulý posun nahoru a zjevení).

2. **Sekce Počasí (`.weather-main`):**
   - Dominantní zobrazení teploty velkým písmem (3.5rem) následované krátkým slovním popisem ("skoro jasno").

3. **Informační box o svátcích (`.svatky-box`):**
   - Zvýrazňuje, kdo má svátek aktuální den, a přidává informaci o zítřku.

4. **Stránkování (Navigace do archivu):**
   - Tlačítka `.nav-btn` pro přechod mezi dny. Neaktivní dny (např. budoucnost) využívají třídu `.disabled` pro snížení opacity a zrušení klikatelnosti (`pointer-events: none`).

5. **Nálada krajiny (`.poetry`):**
   - Textový blok formátovaný kurzívou, silně orientovaný na lokální geografii (Javorový, Ostrý, řeka Olše).

6. **Komentář Realisty (`#agent2-komentar`):**
   - Vizuálně výrazně odlišený blok. Používá červené tóny (`rgba(239, 68, 68, 0.1)` pozadí a `#ef4444` rámeček zleva) jako varování nebo "narušení" běžného toku. Reprezentuje hlas Jiřího.

7. **Horoskopy (`.horoskop`):**
   - Využití CSS Gridu pro responzivní rozložení (`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`).
   - Interaktivní prvky postavené na tagu `<details>`. CSS skrývá výchozí prohlížečovou šipku (`summary::-webkit-details-marker { display: none; }`). Při otevření se mění podbarvení.

## 4. Analýza SEO a optimalizace
- **Klady:**
  - Přítomnost správného tagu `<title>` obsahujícího lokaci a datum ("Duch Třince - Počasí a Hvězdy ze dne...").
  - Sémantické označení jazyka `<html lang="cs">`.
  - Responzivní meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
  - Dobrá rychlost načítání (díky absenci externích JS knihoven a malému objemu dat).
- **Zápory / Možnosti zlepšení:**
  - Chybí tag `<meta name="description">` pro lepší zobrazení ve výsledcích vyhledávání.
  - Chybí OpenGraph tagy (např. `og:title`, `og:image`) pro hezčí sdílení na sociálních sítích. Přestože parser obsahu našel zmínku "OG Description: Fetched live", v samotném HTML tyto tagy chybí.
  - Sémantika nadpisů: Pod hlavičkou `<h1>` se skáče rovnou do tříd `.section-title` (které jsou reprezentovány obyčejným `<div>`), místo logického využití `<h2>` a `<h3>`.

## 5. Závěr a zhodnocení
Web `eljir.com` je ukázkou moderního, minimalistického frontendu, který klade velký důraz na estetiku, typografii a CSS efekty. Svým zaměřením představuje originální koncept regionálního periodika s dvojí osobností, které je nenáročné na provoz a nabízí uživateli rychlý, vizuálně příjemný zážitek bez rušivých elementů a těžkých skriptů.
