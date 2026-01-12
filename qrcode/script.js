document.getElementById('qrForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    const loader = document.getElementById('loader');
    const btnText = generateBtn.querySelector('span');
    const resultContainer = document.getElementById('resultContainer');
    const qrImage = document.getElementById('qrImage');
    const downloadLink = document.getElementById('downloadLink');

    const text = textInput.value.trim();
    if (!text) return;

    // Stav načítání UI
    generateBtn.disabled = true;
    loader.style.display = 'block';
    btnText.style.opacity = '0.5';
    // Skrýt předchozí výsledek
    resultContainer.classList.remove('show');

    // Vymazat předchozí QR kód (ačkoli používáme img tag, knihovna může připojit canvas/tabulku)
    // Knihovna, kterou používáme (QRCode.js), připojuje element do kontejneru.
    // ALE naše HTML má tag <img>. Musíme se přizpůsobit.
    // Ve skutečnosti QRCode.js generuje element uvnitř kontejneru.
    // Změníme strategii: Použijeme dočasný kontejner pro vygenerování kódu,
    // a poté extrahujeme data URL z vygenerovaného canvasu/obrázku.

    try {
        // Vytvoření dočasného kontejneru
        const tempContainer = document.createElement('div');

        // Generování QR kódu
        new QRCode(tempContainer, {
            text: text,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Knihovna vytvoří buď canvas nebo img tag.
        // Musíme chvíli počkat na vykreslení? Obvykle je to synchronní.

        // Najít zdroj obrázku
        // QRCode.js vloží canvas a img.
        setTimeout(() => {
            const canvas = tempContainer.querySelector('canvas');
            const img = tempContainer.querySelector('img');

            let imageUrl;

            if (canvas) {
                imageUrl = canvas.toDataURL("image/png");
            } else if (img) {
                imageUrl = img.src;
            }

            if (imageUrl) {
                // Aktualizace UI s výsledkem
                qrImage.src = imageUrl;
                downloadLink.href = imageUrl;

                resultContainer.classList.add('show');
            } else {
                alert('Generování selhalo (obrázek nebyl vytvořen).');
            }

            // Resetování UI
            generateBtn.disabled = false;
            loader.style.display = 'none';
            btnText.style.opacity = '1';

        }, 100); // Malé zpoždění pro zajištění vykreslení

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate QR Code. Please try again.');
        generateBtn.disabled = false;
        loader.style.display = 'none';
        btnText.style.opacity = '1';
    }
});
