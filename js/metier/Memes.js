import { REST_ADR } from "../config.js";
import { Meme } from "./Meme.js";

/**
 * Classe pour la manipulation des ressources REST des memes
 */
class Memes extends Array {
  // Chemin des ressources sur le serveur REST (statique)
  static #ressourcePath = "/memes";

  /**
   * Getter statique pour le chemin des ressources
   * @returns {string} Le chemin des memes
   */
  static get ressourcePath() {
    return Memes.#ressourcePath;
  }

  // Promise de chargement des memes
  #promiseMemes = undefined;

  /**
   * Getter pour la promise des memes
   * Initialise le chargement si ce n'est pas encore fait
   */
  get promiseMemes() {
    if (this.#promiseMemes === undefined) this.loadMemes();
    return this.#promiseMemes;
  }

  /**
   * Chargement des memes depuis le serveur REST
   */
  loadMemes() {
    if (this.#promiseMemes === undefined) {
      this.#promiseMemes = fetch(`${REST_ADR}${Memes.#ressourcePath}`)
        .then((ms) => ms.json())
        .then((ms) => {
          // Vide le tableau actuel et ajoute les nouveaux memes
          this.splice(0);
          ms.forEach((element) => {
            const meme = new Meme();
            Object.assign(meme, element); // Copie les propriétés dans l'objet Meme
            this.push(meme);
          });
          return this;
        });
    }
    return this.#promiseMemes;
  }
}

export const memes = new Memes(); // Instance principale de toutes les memes de l'application
memes.loadMemes(); // Chargement des memes au démarrage de l'application
