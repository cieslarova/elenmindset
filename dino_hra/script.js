const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let hraBezi = false;
let dinoWidth = 52; // Zvětšený Dino
let dinoHeight = 65;
let dinoX = 70;
let dinoY = 120; // 185 (písek) - 65 (výška) = 120
let dinoVelocityY = 0;
let gravity = 0.95;
let skore = 0;
let nejvetsiSkore = localStorage.getItem("nejvetsiSkore") || 0;
let rychlost = 5;


// nactení obrázků
const dinoImg = new Image();
dinoImg.src = "img/poseidonsaurus.png";

const kactus1Img = new Image();
kactus1Img.src = "img/kaktus1.png";

const kactus2Img = new Image();
kactus2Img.src = "img/keketus2.png";

const kactus3Img = new Image();
kactus3Img.src = "img/keketus.webp";

const bgImg = new Image();
bgImg.src = "img/krajina.png";


// proměnné pro kaktusy
let kactus1X = 700;
let kactus1Width = 40;
let kactus1Height = 60;
let kactus1Y = 125; // 185 (písek) - 60 (výška) = 125

let kactus2X = 1200;
let kactus2Width = 60;
let kactus2Height = 60;
let kactus2Y = 125;

let kactus3X = 1700;
let kactus3Width = 45;
let kactus3Height = 60;
let kactus3Y = 125;

let bgX = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pozadí (Krajina) - vykreslí se dvakrát pro efekt nekonečna
    ctx.drawImage(bgImg, bgX, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, bgX + canvas.width, 0, canvas.width, canvas.height);

    // Dino
    ctx.drawImage(dinoImg, dinoX, dinoY, dinoWidth, dinoHeight);

    if (hraBezi) {
        skore = skore + 0.150;
        rychlost = 5 + Math.floor(skore / 100) * 0.5;
        // Kreslení kaktusů
        ctx.drawImage(kactus1Img, kactus1X, kactus1Y, kactus1Width, kactus1Height);
        ctx.drawImage(kactus2Img, kactus2X, kactus2Y, kactus2Width, kactus2Height);
        ctx.drawImage(kactus3Img, kactus3X, kactus3Y, kactus3Width, kactus3Height);

        // Pohyb pozadí
        bgX = bgX - rychlost;
        if (bgX <= -canvas.width) {
            bgX = 0;
        }

        // Pohyb Dina
        dinoY = dinoY + dinoVelocityY;
        dinoVelocityY = dinoVelocityY + gravity;
        if (dinoY > 120) { // Musí být stejné jako startovní dinoY
            dinoY = 120;
            dinoVelocityY = 0;
        }

        // Pohyb kaktusů
        kactus1X = kactus1X - rychlost;
        kactus2X = kactus2X - rychlost;
        kactus3X = kactus3X - rychlost;

        // Reset kaktusů
        if (kactus1X < -kactus1Width) kactus1X = Math.max(kactus2X, kactus3X) + 200 + Math.random() * 300;
        if (kactus2X < -kactus2Width) kactus2X = Math.max(kactus1X, kactus3X) + 250 + Math.random() * 300;
        if (kactus3X < -kactus3Width) kactus3X = Math.max(kactus1X, kactus2X) + 230 + Math.random() * 300;

        // Kontrola kolizí
        if (kolize(kactus1X, kactus1Y, kactus1Width,
            kactus1Height) ||
            kolize(kactus2X, kactus2Y, kactus2Width,
                kactus2Height) ||
            kolize(kactus3X, kactus3Y, kactus3Width,
                kactus3Height)) {
            hraBezi = false;

            if (skore > nejvetsiSkore) {
                nejvetsiSkore = Math.floor(skore); // tady to zaokroulime na cele cislo dolu 
                localStorage.setItem("nejvetsiSkore", nejvetsiSkore);
            }
        }
    } else {
        // Tady jsme v MENU (hra neběží)
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        if (skore > 0) {
            // Tohle se ukáže, když už jsme jednou hráli a narazili
            ctx.font = "50px 'Comic Neue', cursive, sans-serif";
            ctx.fillText("GAME OVER", canvas.width / 2, 120);
        } else {
            // Tohle se ukáže jen úplně na začátku, když je skóre 0
            ctx.font = "50px 'Comic Neue', cursive, sans-serif";
            ctx.fillText("Dino hra", canvas.width / 2, 80);
            ctx.font = "20px 'Comic Neue', cursive, sans-serif";
            ctx.fillText("STISKNI MEZERNÍK PRO START", canvas.width / 2, 120);
        }
    }
    ctx.fillStyle = "black";
    ctx.font = "20px 'Comic Neue', cursive, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("Skore: " + Math.floor(skore), canvas.width - 20, 30);
    ctx.fillText("Rekord: " + Math.floor(nejvetsiSkore), canvas.width - 20, 60);
}

window.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jumpAction();
    }
});

function kolize(cX, cY, cW, cH) {
    return (
        dinoX < cX + cW &&
        dinoX + dinoWidth > cX &&
        dinoY < cY + cH &&
        dinoY + dinoHeight > cY
    );
}

// Funkce pro skok (společná pro mezerník i tlačítko)
function jumpAction() {
    if (!hraBezi) {
        hraBezi = true;
        skore = 0;
        rychlost = 5;
        kactus1X = 700;
        kactus2X = 1200;
        kactus3X = 1700;
    } else if (dinoY >= 120) { // Musí být stejné jako startovní dinoY
        dinoVelocityY = -17;
    }
}

// Tlačítko pro mobily
const jumpBtn = document.getElementById("jumpBtn");
jumpBtn.addEventListener("pointerdown", function (event) {
    event.preventDefault(); // Zabrání dvojímu kliknutí/označení textu
    jumpAction();
});

// Detekce mobilního zařízení
function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Jednoduchá kontrola klíčových slov v userAgent
    const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];

    // Upravená detekce pro iPady (které se tváří jako Mac) a mobilní zařízení
    const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));

    // Detekce iPadu na iPadOS 13+ (hlásí se jako Macintosh, ale má dotykovou obrazovku)
    const isIpad = userAgent.includes('mac') && (navigator.maxTouchPoints > 0);

    // Kontrolujeme UA nebo iPad. 
    // Poznámka: Odstranili jsme kontrolu pouhé šířky okna, aby se tlačítko nezobrazovalo na PC při zmenšení okna.
    return isMobileDevice || isIpad;
}

function updateButtonVisibility() {
    if (isMobile()) {
        jumpBtn.style.display = "flex";
        console.log("Mobilní zobrazení - tlačítko zobrazeno.");
    } else {
        jumpBtn.style.display = "none";
        console.log("PC zobrazení - tlačítko skryto.");
    }
}

// Spustíme kontrolu při načtení
updateButtonVisibility();

// A také při změně velikosti okna (např. když v prohlížeči přepneš na mobilní zobrazení)
window.addEventListener('resize', updateButtonVisibility);

setInterval(draw, 16);