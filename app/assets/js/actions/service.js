    // Écouteur pour les messages envoyés par d'autres parties de l'extension
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('Message reçu:', request);
        if (request.action === 'closeSidePanel') {
        chrome.sidePanel.close().then(() => {
            console.log('Panneau latéral fermé.');
            sendResponse({ status: 'Side panel fermé' });
        }).catch((error) => {
            console.error('Erreur lors de la fermeture du panneau latéral:', error);
            sendResponse({ status: 'Erreur lors de la fermeture du panneau latéral' });
        });
        // Indiquer que la réponse sera envoyée de manière asynchrone
        return true;
        }
    });
    // Écouteur pour l'événement d'installation de l'extension
    chrome.runtime.onInstalled.addListener(() => {
        console.log('Extension installée.');
        // Initialiser l'état de mode à 'popup' si aucun état n'est encore défini
        chrome.storage.local.get(['mode'], (result) => {
            if (!result.mode) {
                console.log('Aucun mode trouvé. Initialisation à "popup".');
                chrome.storage.local.set({ mode: 'popup' });
            } else console.log('Mode existant trouvé:', result.mode);
        });
    });
    
    // Écouteur pour l'événement de démarrage du Service Worker
    chrome.runtime.onStartup.addListener(() => {
        console.log('Service Worker démarré.');
    });
    chrome.sidePanel.setOptions({ path: '../../../sidepanel.html' }).then(() => {
        console.log('Side panel ouvert avec succès.');
    }).catch((error) => {
        console.error('Erreur lors de l\'ouverture du side panel :', error);
    });
