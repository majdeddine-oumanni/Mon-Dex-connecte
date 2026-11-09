import { getCreatures } from "./data.js";

let cardsContainer = document.querySelector(".cards-container");
let detailSection = document.getElementById("detail");
let backBtn = document.getElementById("back-btn");


let allCreatures = [];
allCreatures = getCreatures();
async function init(creatures) {

    
    cardsContainer.innerHTML = "";

    creatures.forEach((creature) => {
        // const image = creature.sprites.other?.['official-artwork']?.front_default || creature.sprites.front_default;
        // const primaryType = creature.types[0]?.type?.name || 'normal';
        // const totalStats = creature.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

        // Notice we put data-id="${creature.id}" on the article tag
        cardsContainer.innerHTML += `
            <article class="flex flex-col gap-3 rounded-card bg-white p-3 pb-4 shadow-sm poke-card cursor-pointer" data-id="${creature.id}">
                <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
                    <img src="${creature.image}" alt="${creature.name}" class="object-contain poke_img">
                    <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${creature.id}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <h3 class="font-display text-xl font-semibold capitalize">${creature.name}</h3>
                    <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink capitalize">${creature.type}</span>
                </div>
                <p class="text-sm text-muted">${creature.level}</p>
                <button type="button" class="btn-outline">Ajouter à l'équipe</button>
            </article>
        `;
    });
}

init(allCreatures);

// -------------------------------------------------------------
// 2. DÉTAIL
// -------------------------------------------------------------

// Listen for clicks on the whole grid container (Event Delegation)
// -------------------------------------------------------------
// 2. DÉTAIL (Fixed)
// -------------------------------------------------------------

// Listen for clicks on the parent grid container (Event Delegation)
cardsContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.poke-card');
    if (!card) return;

    const creatureId = Number(card.getAttribute('data-id'));
    const creature = allCreatures.find(c => c.id === creatureId);
    if (!creature) return;

    detailSection.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="font-mono text-sm text-muted">#${creature.id} · Détail</span>
            <button type="button" aria-label="Fermer le détail" class="btn-outline w-11 px-0" id="back-btn">✕</button>
        </div>
        <div class="flex h-48 items-center justify-center rounded-2xl bg-brand-light">
            <img src="${creature.image}" alt="${creature.name}" class="h-40 object-contain">
        </div>
        <div class="flex items-center justify-between">
            <h2 class="font-display text-3xl font-extrabold capitalize">${creature.name}</h2>
            <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold capitalize">${creature.type}</span>
        </div>
        <p class="text-gray-700">Une créature unique prête pour l'aventure.</p>
        <div class="flex flex-col gap-2 text-sm">
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">PV</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 w-[${creature.stats.hp}%] rounded-full bg-brand"></span></span><span class="text-right font-mono">${creature.stats.hp}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Attaque</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 w-[${creature.stats.attack}%] rounded-full bg-brand"></span></span><span class="text-right font-mono">${creature.stats.attack}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Défense</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 w-[${creature.stats.defence}%] rounded-full bg-brand"></span></span><span class="text-right font-mono">${creature.stats.defence}</span></div>
        </div>
        <button type="button" class="btn-primary">Ajouter à l'équipe</button>
    `;
});

detailSection.addEventListener('click', (event) => {
    const closeBtn = event.target.closest('#back-btn');
    if (!closeBtn) return;

    detailSection.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 text-center text-muted gap-2">
            <span class="text-xl font-semibold">Aucune créature sélectionnée</span>
            <p class="text-sm">Cliquez sur une carte pour voir ses détails ici.</p>
        </div>
    `;
});
// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------
const rech = document.querySelector("#search");
const filtersContainer = document.querySelector("#filters");

let currentType = "tous"; 

function searchFilter() {
    const text = rech.value.toLowerCase().trim();

    const res = allCreatures.filter((creature) => {

        const perName = creature.name.toLowerCase().includes(text);

        const primaryType = creature.type;

        const perType = currentType === "tous" || primaryType === currentType;

        return perName && perType;
    });

    init(res);
}

if (rech) {
    rech.addEventListener("input", searchFilter);
}


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------
// 2. Listen for clicks on the filter container using Event Delegation
if (filtersContainer) {
    filtersContainer.addEventListener("click", (event) => {
        const clickedBtn = event.target.closest('.type-btn');
        if (!clickedBtn) return; 

        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.classList.remove('bg-ink', 'text-white', 'border-ink');
        });
        clickedBtn.classList.add('bg-ink', 'text-white', 'border-ink');

        currentType = clickedBtn.getAttribute('data-type');

        searchFilter();
    });
}

// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------

function error(id, msg, inputId) {
  const errorEL = document.getElementById(id);
  errorEL.innerHTML = msg;
  errorEL.style.display = "block";
  const input = document.querySelector(inputId);
  input.classList.remove("border-brand-light");
  input.classList.add("border-red-600");
}
// error remove function
function errorRemovale(id, inputId) {
  const errorEL = document.querySelector(id);
  errorEL.textContent = "";
  errorEL.style.display = "none";
  const input = document.querySelector(inputId);
  input.classList.remove("border-red-600");
  input.classList.add("border-brand-light");
}

// id validation
function idValidation() {
  const id = document.querySelector("#id").value.trim();
  errorRemovale("#idError", "#id");
  const regex = /^\d+$/;

  if(id === NaN) {
    error("idError", "id required", "#id");
    return false;
  }
  if(!regex.test(id)) {
    error("idError", "the id should be a number", "#id");
    return false;
  }
  for (let i = 0; i < allCreatures.length; i++) {
    if (allCreatures[i].id === id) {
      error("idError", "this id already exist", "#id");
      return false;
    }
  }

  return true;
}

// name validation
function nameValidation() {
  const name = document.querySelector("#name").value.trim();
  errorRemovale("#nameError", "#name");

  if (name === "") {
    error("nameError", "name is required", "#name");
    return false;
  }
  if (name.length <= 2) {
    error("nameError", "name should be at least 3 letters", "#name");
    return false;
  }

  return true;
}

// attack validation
function attackValidation() {
  const attack = document.querySelector("#attack").value.trim();
  errorRemovale("#attackError", "#attack");

  if (attack === "") {
    error("attackError", "stats is required", "#attack");
    return false;
  }
  if (isNaN(attack)) {
    error("attackError", "stats should be a number", "#attack");
    return false;
  }
  if (Number(attack) > 5000) {
    error("attackError", "the max stats is 5000", "#attack");
    return false;
  }
  if (Number(attack) < 0) {
    error("attackError", "the  stats should be positive ", "#attack");
    return false;
  }

//   return true;
// }

//defence validation
function defenceValidation() {
  const defence = document.querySelector("#defence").value.trim();
  errorRemovale("#defenceError", "#defence");

  if (defence === "") {
    error("defenceError", "stats is required", "#defence");
    return false;
  }
  if (isNaN(defence)) {
    error("defenceError", "stats should be a number");
    return false;
  }
  if (Number(defence) > 5000) {
    error("defenceError", "the max stats is 5000", "#defence");
    return false;
  }
  if (Number(defence) < 0) {
    error("defenceError", "the stat should be positive ", "#defence");
    return false;
  }
  return true;
}

// img validation
function imgValidation() {
  const img = document.querySelector("#img").value.trim();
  errorRemovale("#imgError", "#img");

  const regexImg =
    /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|avif|bmp|svg)(\?.*)?$/i;
  if (img === "") {
    error("imgError", "image required", "#img");
    return false;
  } else if (!regexImg.test(img)) {
    error("imgError", "this is not a valid image url", "#img");
    return false;
  }
  return true;
}

// description validation
function descriptionValidation() {
  const description = document.querySelector("#description").value.trim();
  errorRemovale("#descriptionError", "#description");

  if (description === "") {
    error("descriptionError", "description is required", "#description");
    return false;
  }
  if (description.length <= 9) {
    error(
      "descriptionError",
      "description should be at least 10 letters",
      "#description",
    );
    return false;
  }

  return true;
}
// level validation
function levelValidation() {
  const level = document.querySelector(".level").value.trim();
  errorRemovale(".levelError", ".level");

  if (level === "") {
    error("levelError", "stats is required", ".level");
    return false;
  }
  if (Number(level) > 12) {
    error("levelError", "the max level is 12", ".level");
    return false;
  }
  return true;
}

function formValidation() {
  const form = document.querySelector("#creature-form");
  // real time check
  form.addEventListener("input", function (e) {
    const field = e.target.id;

    if (field === "id") idValidation();
    if (field === "name") nameValidation();
    //if (field === "attack") attackValidation();
    //if (field === "defence") defenceValidation();
    if (field === "img") imgValidation();
    if (field === "description") descriptionValidation();
    if (field === "level") levelValidation();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const idOk = idValidation();
    const nameOk = nameValidation();
    //const attackOk = attackValidation();
    //const defenceOk = defenceValidation();
    const imgOk = imgValidation();
    const levelOk = levelValidation();
    const descriptionOk = descriptionValidation();

    if (
      idOk &&
      nameOk &&
      //attackOk &&
      //defenceOk &&
      imgOk &&
      levelOk &&
      descriptionOk
    ) {
      // alert("the form is submitted");
      const newCreature = {
        id: document.querySelector("#id").value.trim(),
        name: document.querySelector("#name").value.trim(),
        type: document.querySelector("#type").value,
        level: "Niveau " + document.querySelector("#level").value.trim(),
        image: document.querySelector("#img").value.trim(),
        description: document.querySelector("#description").value.trim(),
        icon: "",
        // stats: {
        //   attack: Number(document.querySelector("#attack").value),
        //   defence: Number(document.querySelector("#defence").value),
        // },
      };
      allCreatures.push(newCreature);

      init(allCreatures);
      form.reset();
    }
  });
}
}
formValidation();


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------
