function toggleMenu() {
    const menu = document.querySelector('nav ul.mobile');
    menu.classList.toggle('active');
}

function zoekVestiging() {
    const zoekterm = document.getElementById("zoekveld").value.toLowerCase();
    const blokken = document.querySelectorAll(".contact-blok");

    blokken.forEach(blok => {
        const tekst = blok.textContent.toLowerCase();
        blok.style.display = tekst.includes(zoekterm) ? "block" : "none";
    });
}
 // Functie om sterrenbeoordeling te selecteren
 document.querySelectorAll('.stars').forEach(starsContainer => {
    starsContainer.querySelectorAll('.star').forEach((star, index) => {
        star.addEventListener('click', () => {
            const allStars = starsContainer.querySelectorAll('.star');
            allStars.forEach((s, i) => {
                s.classList.toggle('selected', i <= index); // Toggle de 'selected' klasse voor geselecteerde sterren
            });
        });
    });
});

// Functie om een recensie toe te voegen aan het overzicht
function voegRecensieToe(filmNaam, sterrenContainer) {
    const aantalSterren = Array.from(sterrenContainer.querySelectorAll('.star.selected')).length;  // Aantal geselecteerde sterren
    const tekst = sterrenContainer.nextElementSibling.value.trim(); // Recensietekst

    if (!tekst || aantalSterren === 0) {
        alert("Geef een beoordeling en een recensie tekst in.");
        return;
    }

    const recensieLijst = document.getElementById("recensieLijst");

    if (recensieLijst.children.length >= 3) {
        recensieLijst.removeChild(recensieLijst.firstChild);  // Verwijder de oudste recensie als er al 3 recensies zijn
    }

    // Maak een nieuwe recensie item
    const nieuweRecensie = document.createElement('div');
    nieuweRecensie.classList.add('recensie-item');
    nieuweRecensie.innerHTML = `<strong>${filmNaam}</strong> - Beoordeling: ${"★".repeat(aantalSterren)}${"☆".repeat(5 - aantalSterren)}
        <p>${tekst}</p>`;

    recensieLijst.appendChild(nieuweRecensie);

    // Kortingsmelding tonen bij drie recensies
    if (recensieLijst.children.length === 3) {
        document.getElementById("kortingsmelding").style.display = "block";
    }

    // Leeg recensie-veld en sterren
    sterrenContainer.nextElementSibling.value = "";
    sterrenContainer.querySelectorAll('.star').forEach(star => star.classList.remove('selected'));
}