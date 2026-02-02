const platno =
    document.getElementById('herniPlatno');
const kreslic = platno.getContext('2d');

const velikost_bloku = 10;
const barva_pozadi = 'black';
let barva_hada = 'lime';
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

    // vypocet nove polohy hada
    if (hraBezi && !pauza) {
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
            barva_hada = barvy_jidla[Math.floor(Math.random() * barvy_jidla.length)];
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
                console.log('Game Over! Skore: ' + (had.length - 3));
                location.reload(); // restart hry
                return;
            }
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
    kreslic.font = '20px comic sans ms';
    kreslic.fillText('Skore: ' + (had.length - 3), 10, 20);
    kreslic.fillText('Rekord: ' + rekord, 450, 20);

    // MENU PŘES HRU (jen když se nehraje)
    if (!hraBezi) {
        // Poloprůhledná černá (poslední číslo 0.5 je 50% průhlednost)
        kreslic.fillStyle = 'rgba(0, 0, 0, 0.5)';
        kreslic.fillRect(0, 0, platno.width, platno.height);
        kreslic.fillStyle = 'white';
        kreslic.textAlign = "center"; // Zarovná text na střed
        kreslic.font = '40px comic sans ms';
        kreslic.fillText('HAD', platno.width / 2, platno.height / 2 - 20);
        kreslic.font = '20px comic sans ms';
        kreslic.fillText('Stiskni ENTER pro start', platno.width / 2, platno.height / 2 + 20);
        kreslic.textAlign = "left"; // Vrátíme zarovnání zpět doleva
    }


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




    // Start hry Mezerníkem (pokud hra neběží)
    if (event.key === ' ' && !hraBezi) {
        hraBezi = true;
    }

})

function nahodneCislo(min, max) {
    return Math.floor(Math.random() * ((max - min) / velikost_bloku)) * velikost_bloku + min;

}
setInterval(herniSmycka, 100) 