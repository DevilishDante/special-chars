	document.addEventListener('DOMContentLoaded', () => {
		const toggleButton = document.getElementById('toggleButton');

		if (toggleButton) {
		toggleButton.addEventListener('click', () => {
			console.log('Bouton bascule cliqué, passage en mode popup.');
			// Vérifier d'abord si le mode est déjà en "popup"
			chrome.storage.local.get(['mode'], (result) => {
			if (result.mode === 'popup') console.log('Le mode est déjà en mode popup, pas de changement nécessaire.');
			else {
				chrome.storage.local.set({ mode: 'popup' }, () => {
					console.log('État sauvegardé en mode popup.');
					// Envoyer un message au background script pour fermer le side panel
					chrome.runtime.sendMessage({ action: 'closeSidePanel' }, (response) => {
						if (chrome.runtime.lastError) console.error('Erreur lors de la fermeture du panneau latéral:', chrome.runtime.lastError);
						else console.log('Réponse du Service Worker:', response.status);
					});
				});
			}
			});
		});
		} else console.error('Bouton toggleButton non trouvé dans le DOM.');
	});
	