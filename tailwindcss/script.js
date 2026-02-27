// Konfigurace Tailwindu (zůstává globální)
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'orbitron': ['Orbitron', 'sans-serif'],
                'jura': ['Jura', 'sans-serif'],
            }
        }
    }
}

// Funkce pro inicializaci jednoho carouselu
function initCarousel(wrapper) {
    const track = wrapper.querySelector('.track'); // Hledáme podle třídy .track uvnitř wrapperu
    const prevBtn = wrapper.querySelector('#prevBtn, .prev-btn') || wrapper.querySelector('button:first-of-type'); // Zkusíme ID (pro zpětnou kompatibilitu) nebo pozici
    const nextBtn = wrapper.querySelector('#nextBtn, .next-btn') || wrapper.querySelector('button:last-of-type');
    const dots = wrapper.querySelectorAll('.dot');

    // Pokud něco chybí, přeskočíme
    if (!track) return;

    let currentIndex = 1; // Začínáme na 1 (kvůli klonu)
    const slides = track.children;
    const totalSlides = slides.length - 2; // Odečteme 2 klony
    let isTransitioning = false;
    let autoPlayInterval;

    // Funkce pro aktualizaci pozice
    function updateCarousel(transition = true) {
        if (transition) {
            track.style.transition = 'transform 0.8s ease-in-out';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function updateDots() {
        let dotIndex = currentIndex - 1;
        if (currentIndex === 0) dotIndex = totalSlides - 1;
        if (currentIndex === totalSlides + 1) dotIndex = 0;

        dots.forEach((dot, index) => {
            if (index === dotIndex) {
                dot.classList.remove('bg-opacity-50');
                dot.classList.add('bg-white');
            } else {
                dot.classList.add('bg-opacity-50');
                dot.classList.remove('bg-white');
            }
        });
    }

    // INIT
    updateCarousel(false);

    // Navigace
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel();
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel();
    }

    // Reset po animaci (nekonečná smyčka)
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex === totalSlides + 1) {
            currentIndex = 1;
            updateCarousel(false);
        } else if (currentIndex === 0) {
            currentIndex = totalSlides;
            updateCarousel(false);
        }
    });

    // Event Listeners pro tlačítka
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Event Listeners pro tečky
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = index + 1;
            updateCarousel();
            resetAutoPlay();
        });
    });

    // Auto Play logic
    function startAutoPlay() {
        changeSlideInterval = 6000; // Unused variable but good practice? No, just clear interval.
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Start auto play
    startAutoPlay();

    // Pause on hover
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);
}

// Najdeme všechny wrappery carouselů a "oživíme" je
document.querySelectorAll('.group').forEach(initCarousel);

// Clipboard functionality for Contact Button
// Clipboard functionality for Contact Button
document.addEventListener('DOMContentLoaded', () => {
    const contactLink = document.getElementById('contactLink');
    const toast = document.getElementById('toast');

    if (contactLink && toast) {
        contactLink.addEventListener('click', (e) => {
            // Prevent default mailto behavior briefly if needed, but we want both usually.
            // Actually, we want mailto to open, so we don't preventDefault logic for valid mail clients.

            const email = 'milos.perina@tria-tr.cz';

            // Robust Copy Function
            const copyText = (text) => {
                if (navigator.clipboard && window.isSecureContext) {
                    return navigator.clipboard.writeText(text);
                } else {
                    // Fallback for older browsers and local file:// protocol
                    return new Promise((resolve, reject) => {
                        try {
                            const textArea = document.createElement("textarea");
                            textArea.value = text;

                            // Ensure it's not visible but part of DOM
                            textArea.style.position = "fixed";
                            textArea.style.left = "-9999px";
                            textArea.style.top = "0";
                            document.body.appendChild(textArea);

                            textArea.focus();
                            textArea.select();

                            const successful = document.execCommand('copy');
                            document.body.removeChild(textArea);

                            if (successful) resolve();
                            else reject(new Error('Copy failed'));
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            };

            copyText(email).then(() => {
                // Show Toast
                toast.classList.remove('translate-y-20', 'opacity-0');

                // Hide Toast after 3 seconds
                setTimeout(() => {
                    toast.classList.add('translate-y-20', 'opacity-0');
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Nepodařilo se zkopírovat email automaticky. Prosím zkopírujte jej ručně.');
            });
        });
    }
});
