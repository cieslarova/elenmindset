<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nová 3D tiskárna!</title>
    <link rel="stylesheet" href="../zkouska_tail.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="../zkouska_tail.js" defer></script>
</head>

<style>
    /* Reset globalní pozadí z CSS souboru pro tuto podstránku */
    body, html {
        background-image: none !important;
        background-color: transparent !important; 
        /* Případně černá, aby to nebliklo bíle při načítání */
        
        
    }

    html {
    background-image: url('../img/pozadi_5-kopie.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
</style>

<body>
    <div class=" fixed inset-0 -z-50 bg-[url('../img/pozadi_7.jpg')] bg-cover bg-center brightness-[70%]"></div>
    <div class="max-w-4xl mx-auto mt-0 mb-8 min-h-screen shadow-2xl backdrop-blur-sm p-12 relative overflow-hidden flex flex-col">
        <!-- Pozadí obsahu (obrázek s průhledností) -->
        <div class="absolute inset-0 bg-[url('../img/pozadi_7-kopie.jpg')] bg-cover bg-center bg-no-repeat -z-20 opacity-80"></div>
        
        <!-- Overlay pro lepší čitelnost textu (ztmavení) -->
        <div class="absolute inset-0 bg-black/60 -z-10"></div>
    <header>
        <nav class="p-8 flex justify-between items-center text-gray-800 bg-white/10 shadow-md">
            <div class="font-bold text-white text-xl"><a href="../zkouska_tail.html">Moje Logo</a></div>
            <ul class="flex gap-4 font-bold">
                <li class="hover:text-blue-500 text-white cursor-pointer"><a href="../zkouska_tail.html">Domů</a></li>
                <li class="hover:text-blue-500 text-white cursor-pointer">O nás</li>
                <li class="hover:text-blue-500 text-white cursor-pointer">Kontakt</li>
            </ul>
        </nav>
    </header>

    <div class="text-white max-w-6xl mx-auto my-8 p-8 min-h-[500px]">
        <h1 class="font-orbitron font-bold text-orange-400 text-[20px] mb-8">5.2.
            <br>
            <span class="text-white text-[50px]">Nová 3D tiskárna!</span>
        </h1>
        <!-- Plovoucí panel s fotkami zarovnaný doprava -->
        <div class="float-right ml-8 mb-8 flex flex-col gap-6 items-center w-[300px]">
             <!-- První obrázek napravo -->
            <img class="w-[200px] h-[200px] object-cover shadow-lg" src="../../img/3D_tiskarna.webp" alt="3d_tiskarna">
             <!-- Oranžová oddělovací čára -->
            <hr class="border-2 border-orange-400 w-full mb-2">
            <!-- Druhý obrázek napravo -->
            <img class="w-[250px] h-[200px] object-cover shadow-lg" src="../../img/3Đ_tisk.jpg" alt="3d_tisk">
        </div>

        <p class="font-jura text-[20px] leading-relaxed">
            Do naší dílny dorazila nová 3D tiskárna!
            <br><br>
            Díky ní budeme moci tisknout větší a složitější modely. Už se těšíme, až na ní vytiskneme první prototypy pro naše roboty.
            <br><br>
            Zastavte se podívat, jak tiskne! Zkoušeli jsme na ní zatím jednodušší věci, ale funguje skvěle. Můžete se na fotkách podívat sami na detaily tisku i stroje samotného. Letošní soutěž bude mít parádní vytisknuté součástky!
        </p>
    </div>


    <footer class="w-full p-8 text-center text-white font-bold bg-white/10 shadow-md mt-auto">
        &copy; 2026 Tria Robolab - Všechna práva vyhrazena
    </footer>
    </div>
</body>
</html>
