import { memes } from "../../js/metier/Memes.js";
import { images } from "../../js/metier/Images.js";

export function loadList() {
  memes.promiseMemes.then((r) => {
    console.table(r);
  });
}
