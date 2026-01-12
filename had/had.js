const platno =
    document.getElementById('herniPlatno');
const kreslic = platno.getContext('2d');

const velikost_bloku = 10;
const barva_pozadi = 'black';
const barva_hada = 'lime';
let barva_jidla = "red";
const barvy_jidla = ["lime", "pink", "blue", "yellow", "cyan", "green", "purple"]

let had = [
    { x: 300, y: 200 }, // hlava
    { x: 290, y: 200 }, // telo
    { x: 280, y: 200 }, // ocas
]


let dx = velikost_bloku;
let dy = 0;
let jidloX = nahodneCislo(0, platno.width);
let jidloY = nahodneCislo(0, platno.height);
let rekord = localStorage.getItem('rekord') || 0;
let pauza = false; // na zacatku hra běží a není pauza
let hraBezi = false; // na zacatku hra není bezi


function herniSmycka() {
    if (!hraBezi) {
        kreslic.fillStyle = barva_pozadi;
        kreslic.fillRect(0, 0, platno.width, platno.height);

        kreslic.fillStyle = 'white';
        kreslic.font = '20px Arial';
        kreslic.fillText('Had', 10, 20);

        kreslic.font = '20px Arial';
        kreslic.fillText('Stiskni Enter pro zacatek hry', 10, 40);
        kreslic.fillText('Stiskni Mezerník pro pauzu', 10, 60);
        kreslic.fillText('Tvůj rekord: ' + rekord, 10, 80);
        return;
    }
    // vypocet nove polohy hada
    if (pauza) return; // pokud je pauza, ukončíme funkci
    let novaX = had[0].x + dx;
    let novaY = had[0].y + dy;
    // teleportace
    if (novaX >= platno.width) novaX = 0;
    if (novaX < 0) novaX = platno.width - velikost_bloku;

    if (novaY >= platno.height) novaY = 0;
    if (novaY < 0) novaY = platno.height - velikost_bloku;

    const hlava = { x: novaX, y: novaY };



    had.unshift(hlava);
    // pokud ma hlava stejnou pozici jako jídlo
    if (had[0].x === jidloX && had[0].y === jidloY) {
        // vygeneruje nove jídlo jinde
        jidloX = nahodneCislo(0, platno.width);
        jidloY = nahodneCislo(0, platno.height);
        barva_jidla = barvy_jidla[Math.floor(Math.random() * barvy_jidla.length)];
    } else {
        // pokud jsme nic nesnedli . uríznemu ocas
        had.pop();
    }
    // tohle kontroluje jestli had nenarazil na ocas
    for (let i = 1; i < had.length; i++) {
        // tohle kontroluje jestli had nenarazil na ocas
        if (had[i].x === had[0].x && had[i].y === had[0].y) {
            let skore = had.length - 3;
            if (skore > rekord) {
                localStorage.setItem('rekord', skore);
            }
            // game over
            alert('Game Over! Skore: ' + (had.length - 3));
            location.reload(); // restart hry
            return;
        }
    }

    kreslic.fillStyle = barva_pozadi;
    kreslic.fillRect(0, 0, platno.width, platno.height);
    kreslic.fillStyle = barva_jidla;
    kreslic.fillRect(jidloX, jidloY, velikost_bloku, velikost_bloku);
    //vyhresli hada
    kreslic.fillStyle = barva_hada;
    //pro kazdý kousek hada
    for (let i = 0; i < had.length; i++) {
        let kousek = had[i];
        //nakreslíme ctverecek na jeho pozici y, x
        kreslic.fillRect(kousek.x, kousek.y, velikost_bloku, velikost_bloku);
    }
    kreslic.fillStyle = 'white';
    kreslic.font = '20px Arial';
    kreslic.fillText('Skore: ' + (had.length - 3), 10, 20);
    kreslic.fillText('Rekord: ' + rekord, 450, 20);


}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        dx = 0;
        dy = -velikost_bloku;
    }
    if (event.key === 'ArrowDown') {
        dx = 0;
        dy = velikost_bloku;
    }
    if (event.key === 'ArrowLeft') {
        dx = -velikost_bloku;
        dy = 0;
    }
    if (event.key === 'ArrowRight') {
        dx = velikost_bloku;
        dy = 0;
    }

    if (event.key === ' ') {
        pauza = !pauza;
        if (pauza) {
            kreslic.fillStyle = 'white';
            kreslic.font = '30px Arial';
            kreslic.textAlign = "center";
            kreslic.fillText('PAUZA', platno.width / 2, platno.height / 2);
            kreslic.textAlign = "left";
        }
    }

    if (event.key === 'Enter' && !hraBezi) {
        hraBezi = true;
    }
})

function nahodneCislo(min, max) {
    return Math.floor(Math.random() * ((max - min) / velikost_bloku)) * velikost_bloku + min;

}
setInterval(herniSmycka, 100) 