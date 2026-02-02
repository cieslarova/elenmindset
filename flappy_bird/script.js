// Tady budeme psát logiku hry
console.log("Hra načtena!");

// 1. Najdeme naše plátno v HTML
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // ctx je náš "štítec" je to ve 2D

let birdX = 45;           // Kde je ptáček zleva  
let birdY = 140;          // Kde je ptáček seshora
let birdVelocity = 0;     // Rychlost pádu (začíná na 0)
let birdAcceleration = 0.5; // Gravitace (jak rychle zrychluje pád)
let pipes = [];           // zaznam vsech trubek ve hře
let pipeWidth = 50;       // jak tlustá je trubka
let pipeGap = 150;        // díra mezi dolní a horní trubkou
let frameCount = 0;       // počet snímků
let score = 0;            // počet získaných bodů
let gameRunning = false;   // hra stojí na startu
let highScore = localStorage.getItem("highScore") || 0;
let birdWidth = 30;       // ŠÍŘKA PTÁKA (tady to můžeš měnit)
let birdHeight = 30;      // VÝŠKA PTÁKA
let bgX = 0;

// Načtení obrázků
const birdImg = new Image();
birdImg.src = "img/ptacek.png";

const bgImg = new Image();
bgImg.src = "img/background.png";


// hlavní smycka hry
function loop() {
    if (gameRunning) {
        update();
        checkCollisions();
    }
    draw();
}




// funkce pro pohyb
function update() {
    // gravitace zvysujeme rychlost pádu
    birdVelocity = birdVelocity + birdAcceleration;
    // pádeme dolu
    birdY += birdVelocity;

    frameCount++;
    if (frameCount % 100 === 0) {
        let topHeight = Math.floor(Math.random() * 200) + 50; // nahodna vyska horni trubky
        pipes.push({
            x: canvas.width,
            y: topHeight,
        });
    }

    // posuneme všechny trubky doleva
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2;
    }
    for (let i = 0; i < pipes.length; i++) {
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
}

// funkce pro kreslení
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pohyb pozadí (posouváme bgX doleva)
    bgX = bgX - 1;
    // Když obrázek dojede nakonec, vrátíme ho na start
    if (bgX <= -canvas.width) {
        bgX = 0;
    }
    // Vykreslíme obrázek dvakrát vedle sebe, aby to navazovalo
    ctx.drawImage(bgImg, bgX, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, bgX + canvas.width, 0, canvas.width, canvas.height);

    // Nakresli ptáčka 
    ctx.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);

    // Kreslení TRUBEK
    ctx.fillStyle = "brown"; // Trubky budou zelené
    for (let i = 0; i < pipes.length; i++) {
        let p = pipes[i];

        // Horní trubka
        ctx.fillRect(p.x, 0, pipeWidth, p.y);

        // Dolní trubka (začíná tam, kde končí horní + mezera)
        ctx.fillRect(p.x, p.y + pipeGap, pipeWidth, canvas.height - p.y - pipeGap);
    }

    // Vykreslení skóre  
    ctx.fillStyle = "white";
    ctx.font = "20px 'Comic Sans MS'";
    ctx.fillText("Skóre: " + score, 10, 30);
    // Rekord vpravo
    ctx.textAlign = "right";  // <--- Tady musí být RIGHT (doprava)
    ctx.fillText("Rekord: " + highScore, canvas.width - 10, 30);
    ctx.textAlign = "left";   // <--- A tady vrátit na LEFT

    if (!gameRunning) {
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        if (score > 0) {
            // Tady jsme PROHRÁLI (skóre už máme)
            ctx.font = "bold 40px 'Comic Sans MS'";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

            ctx.font = "20px 'Comic Sans MS'";
            ctx.fillText("zkus to znovu", canvas.width / 2, canvas.height / 2 + 10);
        } else {
            // Tady jsme ÚPLNĚ NA ZAČÁTKU (skóre 0)
            ctx.font = "bold 40px 'Comic Sans MS'";
            ctx.fillText("Flappy Bird", canvas.width / 2, canvas.height / 2 - 40);

            ctx.font = "20px 'Comic Sans MS'";
            ctx.fillText("Stiskni MEZERNÍK", canvas.width / 2, canvas.height / 2 + 10);
        }

        ctx.textAlign = "left"; // Vrátíme zarovnání zpátky
    }
}
setInterval(loop, 20);


const jumpBtn = document.getElementById("jumpBtn");

function jump() {
    // 1. Pokud hra ještě neběžela, zapneme ji
    if (!gameRunning) {
        gameRunning = true;
        score = 0;
        frameCount = 0;
        pipes = [];
    }

    // 2. Vyskoč ptáčkem nahoru
    birdVelocity = -8;
}

// Tlačítko pro mobily
jumpBtn.addEventListener("pointerdown", function (event) {
    event.preventDefault();
    jump();
});

// Klávesnice
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (event.repeat) return; // zabrání opakování při podržení
        jump();
    }
});

function checkCollisions() {
    if (birdY + birdHeight > canvas.height || birdY < 0) {
        resetGame();
    }
    for (let i = 0; i < pipes.length; i++) {
        let p = pipes[i];

        if (birdX + birdWidth > p.x && birdX < p.x + pipeWidth) {
            if (birdY < p.y || birdY + birdHeight > p.y + pipeGap) {
                resetGame();
            }
        }
    }
}

// detekce pro mobilní zařízení
function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];

    // Používáme userAgent (malá písmena) pro porovnání
    const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
    const isIpad = userAgent.includes('ipad') || (userAgent.includes('mac') && isTouch);

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

function resetGame() {

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
    birdY = 140;
    birdVelocity = 0;
    pipes = [];
    frameCount = 0;
    gameRunning = false;

}

// spustíme kontrolu při načtení stránky
updateButtonVisibility();

// kontrola při změně velikosti okna
window.addEventListener("resize", updateButtonVisibility);

setInterval(draw, 16);