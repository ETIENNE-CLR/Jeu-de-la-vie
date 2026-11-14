/**
 * Méthode qui me permet de récupérer le bon nombre de `../`
 * en fonction du nombre de / dans l'URL
 * @returns {string} les '../'
 */
export function getAddonPath() {
    const path = window.location.pathname;
    const slashCount = (path.match(/\//g) || []).length;
    let addonPath = '';

    for (let i = slashCount; i > 1; i--) {
        addonPath += '../';
    }
    return addonPath;
}

export function 