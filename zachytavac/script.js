const btnZiskatTitulek = document.getElementById('btnZiskatTitulek');
const urlInput = document.getElementById('urlInput');
const vysledekBox = document.getElementById('vysledek');
const titleObsah = document.getElementById('titleObsah');

// asyn() říká, že funkce bude pracovat asynchronně, tzn. bude nějakou dobu trvat, např. stahovat data
// a v další části kódu se použije await, což znamená, že se zde musí čekat na dokončení 
btnZiskatTitulek.addEventListener('click', async () => {
    let url = urlInput.value.trim();

    if (!url) {
        alert('Prosím zadejte platnou URL adresu.');
        return;
    }

    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    // UI Loading State
    btnZiskatTitulek.disabled = true;
    btnZiskatTitulek.innerHTML = '<span class="loading"></span> Načítám...';
    vysledekBox.classList.remove('visible');
    titleObsah.className = 'title-obsah';

    try {
        // Using corsproxy.io as a CORS proxy
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);

        if (!response.ok) throw new Error('Network response was not ok');

        const html = await response.text();

        if (!html) {
            throw new Error('Stránku se nepodařilo načíst (žádný obsah).');
        }

        // Parse HTML to get title
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const pageTitle = doc.querySelector('title') ? doc.querySelector('title').textContent : 'Stránka nemá žádný titulek';

        titleObsah.innerText = pageTitle;
        vysledekBox.classList.add('visible');

    } catch (error) {
        console.error(error);
        titleObsah.innerText = 'Chyba při načítání stránky. Ujistěte se, že URL je platná.';
        titleObsah.classList.add('error');
        vysledekBox.classList.add('visible');
    } finally {
        btnZiskatTitulek.disabled = false;
        btnZiskatTitulek.innerText = 'Získat Titulek';
    }
});

// Allow Enter key to submit
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnZiskatTitulek.click();
    }
});