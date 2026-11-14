import { AssetsManager } from "../../game/managers/AssetsManager.js";

/**
 * Méthode qui retourne le nombre précis en fonction de son pourcentage
 * @param {number} percentage Pourcentage voulu
 * @param {number} total Réel total du pourcentage
 * @returns {number} nombre
 */
export function getNumberFromPourcentage(percentage, total) {
    return (percentage / 100) * total;
}

/**
 * Méthode qui retoure un nombre entien aléatoire dans une plage donnée
 * @param {number} min Nombre minimal de la plage aléatoire (inclus)
 * @param {number} max Nombre maximal de la plage aléatoire (inclus)
 * @returns {number} Le nombre aléatoire
 */
export function getRandomInt(min = 1, max = 100) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Méthode qui retourne un ID aléatoire compris de lettres et de chiffres
 * @param {number} length La longueur de l'ID
 * @returns {string} L'ID aléatoire
 */
export function getRandomID(length = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Méthode qui permet de retourner un élément aléatoire d'une liste
 * @param {Array} list La liste
 * @returns {*} L'élement aléatoire de la liste
 */
export function getRandomValueFromList(list) {
    return list[this.getRandomInt(0, list.length - 1)];
}

/**
 * Fonction pour donner un temps d'attente
 * @param {number} secondes Nombre de seconde qu'on doit attendre
 * @returns {Promise} Promesse qui se termine après le nombre de secondes qu'on lui a donné
 */
export function sleep(secondes) {
    return new Promise(resolve => setTimeout(resolve, secondes * 1000));
}

/**
 * Méthode qui convertie un nombre en un string dont tous les milliers sont séparés par un apostrophe
 * @param {number} number Nombre à convertir 
 * @returns {string} String du nombre formatté
 */
export function formatNumberWithApostrophes(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

/**
 * Fonction qui permet de mettre en majuscule chaque première lettre de chaque mot d'un string
 * @param {string} str String original
 * @returns {string} String modifié
 */
export function capitalizeFirstLetterOfEachWord(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Fonction qui permet de faire un fetch GET simple
 * @param {string} url url du fetch
 * @param {boolean} fetchTest qui dit si le fetch est un test ou non
 * @returns {JSON|null} La sortie du fetch
 */
export async function simpleFetch(url, fetchTest = false) {
    try {
        const response = await fetch(url, {
            method: "GET"
        });

        // Vérifie si la réponse est OK (status entre 200 et 299)
        if (!response.ok && !fetchTest) {
            throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
        }

        // Tente de convertir en JSON
        const data = await response.json();
        return data;
    } catch (error) {
        if (!fetchTest) {
            console.error("Erreur lors du fetch :", error.message);
        }
        return null;
    }
}

/**
 * Forcer que la valeur entre un min et un max
 * @param {number} value valeur à vérifier
 * @param {number} min Bordure min
 * @param {number} max Bordure max
 * @returns {number} valeur assuré dans les bordures
 */
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Méthode qui permet de mettre en majuscule
 * la première lettre d'un string
 * @param {string} str le string à transformer
 * @returns {string} le string transformé
 */
export function firstCharToUpperCase(str) {
    const space = ' ';
    let returnArray = [];
    let strArray = str.split(space).filter(Boolean);
    strArray.forEach(word => {
        let wordTrans = word[0].toUpperCase() + word.substring(1, word.length).toLowerCase();
        returnArray.push(wordTrans);
    });
    return returnArray.join(space);
}

/**
 * Enlève les accents d'un string
 * @param {string} str String à modifier
 * @returns {string} le string modifié
 */
export function removeAccents(str) {
    return str
        .normalize("NFD")                 // Décompose les lettres accentuées
        .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
}