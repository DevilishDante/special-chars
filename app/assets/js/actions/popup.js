    document.addEventListener('DOMContentLoaded', () => {
        // Récupérer le bouton toggleButton
        const toggleButton = document.getElementById('toggleButton');
    
        // Vérifier le mode actuel dans le storage local
        chrome.storage.local.get(['mode'], (result) => {
        if (result.mode === 'sidePanel') {
            // Ouvrir directement le side panel si le mode est déjà 'sidePanel'
            chrome.sidePanel.setOptions({ path: '/app/sidepanel.html' }).then(() => {
            console.log('Ouverture du panneau latéral.');
            window.close(); // Fermer le popup après ouverture du side panel
            }).catch((error) => {
            console.error('Erreur lors de l\'ouverture du panneau latéral:', error);
            });
        } else {
            // Le mode n'est pas 'sidePanel', afficher le bouton toggleButton
            if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                console.log('Bouton bascule cliqué, passage en mode barre latérale.');
    
                // Mettre à jour le mode en 'sidePanel'
                chrome.storage.local.set({ mode: 'sidePanel' }, () => {
                console.log('État sauvegardé en mode barre latérale.');
    
                // Fermer le popup actuel
                window.close();
    
                // Ouvrir le side panel avec le contenu spécifié
                chrome.sidePanel.setOptions({ path: '/app/sidepanel.html' }).catch(err => {
                    console.error('Erreur lors de l\'ouverture du panneau latéral:', err);
                });
                });
            });
            } else {
            console.error('Bouton toggleButton non trouvé dans le DOM.');
            }
        }
        });
    });
    