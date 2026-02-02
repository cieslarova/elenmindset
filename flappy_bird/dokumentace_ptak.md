

---

# 🐦 Kompletní dokumentace: Flappy Bird JS

Tato dokumentace podrobně rozebírá logiku a strukturu klonu hry Flappy Bird. Hra je postavena na technologii HTML5 Canvas a čistém JavaScriptu.

## 🎨 1. HTML5 Canvas a souřadnice

Plátno (`canvas`) funguje jako mřížka. Je důležité pochopit, že bod **[0,0] se nachází v levém horním rohu**.

* **Osa X:** Roste směrem doprava.
* **Osa Y:** Roste směrem **dolů** (to je nezvyk, v matematice roste nahoru).

```javascript
// Štětec (ctx) používáme k "malování" na plátno. To je neco jako pouzdro s pastelkami
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Nakreslení čtverečku (x, y, šířka, výška)
ctx.fillRect(birdX, birdY, 20, 20);

```

## 🧠 2. Herní smyčka (Game Loop)

Hra nefunguje jako statická stránka. Musí se neustále překreslovat. K tomu používáme `setInterval`.

1. **Smazání:** `ctx.clearRect()` – vymaže starý snímek, aby se tam postavy "neduchovaly".
2. **Výpočet:** Funkce `update()` změní pozice (ptáček spadne o kousek níž).
3. **Vykreslení:** Funkce `draw()` nakreslí vše na nové pozice.

```javascript
function loop() {
    if (gameRunning) {
        update();           // 1. spočítej nové pozice
        checkCollisions();  // 2. zkontroluj nárazy
    }
    draw();                 // 3. všechno vykresli
}

```

## 🌪 3. Detailní logika trubek

Trubky jsou nejtěžší částí kódu. Musíme vygenerovat horní trubku a spodní trubku tak, aby mezi nimi byla **mezera (`pipeGap`)**.

```javascript
// Generování nové trubky
if (frameCount % 100 === 0) {
    let topHeight = Math.floor(Math.random() * 200) + 50; 
    pipes.push({
        x: canvas.width, // Začíná na pravém okraji
        y: topHeight,    // Výška horní trubky
    });
}

```

Při vykreslování pak spodní trubku vypočítáme takto:

* Začátek Y = `y` (výška horní) + `pipeGap` (mezera).
* Výška = Celková výška plátna - horní trubka - mezera.

## 🏆 4. Správa stavu a rekordy

Hra rozlišuje mezi stavy `gameRunning = true` (hraješ) a `false` (úvodní obrazovka / Game Over).

### LocalStorage

Aby hráč neztratil svůj rekord po obnovení stránky (F5), ukládáme `highScore` do paměti prohlížeče:

* **Uložení:** `localStorage.setItem("key", hodnota)` – uloží textový řetězec pod klíč.
* **Načtení:** `localStorage.getItem("key")` – získá data zpět.

```javascript
// Pokud je aktuální skóre vyšší než uložený rekord, přepiš ho
if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
}

```

