import { specialChars } from "./chars.js";
import { emoji } from "./emoji.js";

document.addEventListener("DOMContentLoaded", () => {
    const popularTags = ['Animaux', 'Émotions', 'Visages', 'Symboles', 'Japonais', 'Humour', 'Coeurs', 'Musique', 'ASCII', 'Texte', 'decorative', 'smiley', 'Emojis'];

    const charListContainer = document.getElementById("char-list");
    const searchInput = document.getElementById("search-input");
    const specialTab = document.getElementById("special-tab");
    const emojiTab = document.getElementById("emoji-tab");

    let currentChars = specialChars; // Variable pour suivre les caractères actuellement affichés

    // Fonction pour créer et afficher les caractères spéciaux ou emojis
    function displayChars(chars) {
        charListContainer.innerHTML = ''; // Efface les caractères précédents
        chars.forEach(item => {
            const charElement = document.createElement("div");
            charElement.textContent = item.char;
            charElement.classList.add("char-item");
            charElement.addEventListener("click", () => copyToClipboard(item.char));
            charListContainer.appendChild(charElement);
        });
    }

    // Affiche tous les caractères spéciaux au chargement initial
    displayChars(specialChars);

    // Fonction pour filtrer et afficher les caractères spéciaux ou emojis en fonction des tags
    function filterChars(query) {
        let filteredChars;
        if (currentChars === specialChars) {
            filteredChars = specialChars.filter(item =>
                item.tags.some(tag => tag.toLowerCase().includes(query))
            );
        } else if (currentChars === emoji) {
            filteredChars = emoji.filter(item =>
                item.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        displayChars(filteredChars);
    }

    // Écouteur d'événement pour le champ de recherche
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        filterChars(query);
    });

    // Écouteurs d'événements pour les onglets
    specialTab.addEventListener('click', () => {
        if (currentChars !== specialChars) {
            currentChars = specialChars;
            specialTab.classList.add('active');
            emojiTab.classList.remove('active');
            filterChars(searchInput.value.toLowerCase());
        }
    });

    emojiTab.addEventListener('click', () => {
        if (currentChars !== emoji) {
            currentChars = emoji;
            emojiTab.classList.add('active');
            specialTab.classList.remove('active');
            filterChars(searchInput.value.toLowerCase());
        }
    });

    // Fonction pour copier le texte dans le presse-papiers
    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        const noadd = document.getElementById('notifs');
        const bg = '#ccff90';
        const check = '#4caf50';
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="'+ bg +'" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="'+ check +'" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"/></svg>';
        noadd.innerHTML = '<div class="green-alert"><span class="char-copied">'+ text +'</span>  Copié dans le presse-papiers ! '+ svg +' </div>';
        setTimeout(() => noadd.innerHTML = '', 6000);
    }
});
