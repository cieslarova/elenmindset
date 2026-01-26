const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let hraBezi = false;
let dinoWidth = 52; // Zvětšený Dino
let dinoHeight = 65;
let dinoX = 70;
let dinoY = 120; // 185 (písek) - 65 (výška) = 120
let dinoVelocityY = 0;
let gravity = 0.95;

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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pozadí (Krajina) - vykreslí se přes celé plátno
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Dino
    ctx.drawImage(dinoImg, dinoX, dinoY, dinoWidth, dinoHeight);

    if (hraBezi) {
        // Kreslení kaktusů
        ctx.drawImage(kactus1Img, kactus1X, kactus1Y, kactus1Width, kactus1Height);
        ctx.drawImage(kactus2Img, kactus2X, kactus2Y, kactus2Width, kactus2Height);
        ctx.drawImage(kactus3Img, kactus3X, kactus3Y, kactus3Width, kactus3Height);

        // Pohyb Dina
        dinoY = dinoY + dinoVelocityY;
        dinoVelocityY = dinoVelocityY + gravity;
        if (dinoY > 120) { // Musí být stejné jako startovní dinoY
            dinoY = 120;
            dinoVelocityY = 0;
        }

        // Pohyb kaktusů
        kactus1X = kactus1X - 5;
        kactus2X = kactus2X - 5;
        kactus3X = kactus3X - 5;

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
        }
    } else {
        // Menu
        ctx.fillStyle = "black";
        ctx.font = "20px comic sans ms";
        ctx.textAlign = "center";
        ctx.fillText("STISKNI MEZERNÍK PRO START", canvas.width / 2, 120);
        ctx.font = "50px comic sans ms";
        ctx.fillText("Dino hra", canvas.width / 2, 80);
    }
}



window.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (!hraBezi) {
            hraBezi = true;
            kactus1X = 700;
            kactus2X = 1200;
            kactus3X = 1700;
        } else if (dinoY >= 120) { // Musí být stejné jako startovní dinoY
            dinoVelocityY = -17;
        }
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

setInterval(draw, 17);