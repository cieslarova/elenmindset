# Dokumentace: Dino Hra 🦖

Tento projekt je jednoduchá webová hra typu "Dino Run", vytvořená pomocí HTML, CSS a čistého JavaScriptu. Hra je optimalizovaná pro počítače i mobilní zařízení.

## 📂 Struktura souborů

- **index.html**: Základní kostra stránky. Obsahuje herní plátno (`<canvas>`) a tlačítko pro skok.
- **style.css**: Vzhled hry. Zajišťuje centrování hry na střed obrazovky, stylizuje tlačítko pro mobil a schovává ho na počítači.
- **script.js**: Hlavní mozek hry. Obsahuje logiku pohybu, kolizí, skóre a vykreslování.

## 🚀 Hlavní funkce

### 1. Bodování (Skóre)
- Skóre se počítá na základě uběhnuté vzdálenosti.
- Každý snímek hry se k aktuálnímu skóre přičte malá hodnota.
- Skóre se zobrazuje v pravém horním rohu.

### 2. Rekord (High Score)
- Hra si pamatuje nejlepší výsledek pomocí `localStorage`.
- Rekord zůstane uložený i po zavření prohlížeče nebo restartu počítače.
- Pokud hráč překoná rekord, nová hodnota se automaticky uloží při nárazu.

### 3. Dynamická obtížnost
- Hra se postupně zrychluje.
- Každých 100 bodů se rychlost pohybu kaktusů a pozadí zvýší o **0.5**.
- To zajišťuje, že hra je čím dál těžší.

### 4. Podpora pro mobilní zařízení
- Hra obsahuje tlačítko **SKOČ**, které reaguje okamžitě na dotyk prstu (pomocí `pointerdown`).
- Tlačítko je viditelné pouze na zařízeních s menší obrazovkou (mobil, tablet).

## 🛠️ Technické detaily (JavaScript)

- **Herní smyčka**: Funkce `draw()` se spouští každých 16ms (`setInterval`), což zajišťuje plynulý pohyb (60 FPS).
- **Kolize**: Funkce `kolize()` kontroluje, zda se obdélník Dina překrývá s obdélníkem některého z kaktusů.
- **Gravitace**: Dino má nastavenou gravitaci, která ho po skoku táhne zpět k zemi.

## 🎮 Ovládání

- **Počítač**: Mezerník (Space) pro skok a start hry.
- **Mobil/Tablet**: Tlačítko "SKOČ" pro skok a start hry.

---
*Vytvořeno s radostí pro budoucí programátory!* 🦖✨
