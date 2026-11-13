import { getCreatures, research } from "./api.js";

let cardsContainer = document.querySelector(".cards-container");
let detailSection = document.getElementById("detail");

let myTeam = []; 
let allCreatures = [];
let limitCreatures = 20;
let offset = 0;

document.getElementById("creature-count").textContent = `${limitCreatures}`;

document.getElementById("charge").addEventListener("click", async () => {
    offset += limitCreatures;
    let newCreatures = await getCreatures(limitCreatures, offset);
    allCreatures.push(...newCreatures);
    init(allCreatures);
});

allCreatures = await getCreatures(limitCreatures, offset);

function init(creatures) {
    cardsContainer.innerHTML = "";

    creatures.forEach((creature) => {
        cardsContainer.innerHTML += `
            <article class="flex flex-col gap-3 rounded-card bg-white p-3 pb-4 shadow-sm poke-card cursor-pointer" data-id="${creature.id}">
                <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
                    <img src="${creature.image}" alt="${creature.name}" class="object-contain poke_img">
                    <span class="absolute left-3 top-2 font-mono text-sm text-muted">#${creature.id}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <h3 class="font-display text-xl font-semibold capitalize">${creature.name}</h3>
                    <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink capitalize">${creature.primaryType}</span>
                </div>
                <p class="text-sm text-muted">${creature.totalStats || ''}</p>
                <button type="button" class="btn-outline add-to-team-button" data-id="${creature.id}">Ajouter à l'équipe</button>
            </article>
        `;
    });
}

init(allCreatures);

// -------------------------------------------------------------
// 2. DÉTAIL & GESTION DES CLICS DE LA GRILLE
// -------------------------------------------------------------
cardsContainer.addEventListener('click', (event) => {
    const addBtn = event.target.closest('.add-to-team-button');
    if (addBtn) {
        event.stopPropagation();
        const creatureId = addBtn.dataset.id;
        const foundedCreature = allCreatures.find((creature) => String(creature.id) === String(creatureId));
        
        if (!foundedCreature) return;

        if (myTeam.length >= 6) {
            alert("Votre equipe est complete (6/6 max)");
            return;
        }

        const alreadyExists = myTeam.some((creature) => String(creature.id) === String(creatureId));
        if (alreadyExists) {
            alert("cette creature est deja dans votre equipe");
            return;
        }

        myTeam.push(foundedCreature);
        renderTeam();
        return;
    }

    const card = event.target.closest('.poke-card');
    if (!card) return;

    const creatureId = Number(card.getAttribute('data-id'));
    const creature = allCreatures.find(c => Number(c.id) === creatureId);
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
            <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold capitalize">${creature.primaryType}</span>
        </div>
        <p class="text-gray-700">Une créature unique prête pour l'aventure.</p>
        <div class="flex flex-col gap-2 text-sm">
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">HP</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full bg-brand" style="width:${creature.HP}%;"></span></span><span class="text-right font-mono">${creature.HP}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Attaque</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full bg-brand" style="width:${creature.ATTACK}%;"></span></span><span class="text-right font-mono">${creature.ATTACK}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Défense</span><span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full bg-brand" style="width:${creature.DEFENCE}%;"></span></span><span class="text-right font-mono">${creature.DEFENCE}</span></div>
        </div>
        <button type="button" class="btn-primary add-to-team-button" data-id="${creature.id}">Ajouter à l'équipe</button>
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
// 3. MON ÉQUIPE (RENDU & SUPPRESSION)
// -------------------------------------------------------------
function renderTeam() {
    const teamSlotsContainer = document.getElementById('team-slots-container');
    const teamCountSpan = document.getElementById('team-count');
    
    if (!teamSlotsContainer || !teamCountSpan) return;

    teamCountSpan.textContent = myTeam.length;
    teamSlotsContainer.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        const creature = myTeam[i];

        if (creature) {
            teamSlotsContainer.innerHTML += `
                <div class="relative flex flex-col items-center justify-center p-3 rounded-xl border-2 border-brand bg-brand-light/40 gap-2 group">
                    <img src="${creature.image}" alt="${creature.name}" class="h-14 object-contain">
                    <span class="text-xs font-bold capitalize truncate w-full text-center">${creature.name}</span>
                    <button type="button" 
                            class="absolute -top-2 -right-2 bg-ink text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-600 transition-colors remove-team-btn" 
                            data-id="${creature.id}" 
                            aria-label="Retirer de l'équipe">
                        X
                    </button>
                </div>
            `;
        } else {
            teamSlotsContainer.innerHTML += `
                <div class="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-dashed border-line bg-ground/50 text-muted">
                    <span class="font-mono text-lg font-bold opacity-40">#${i + 1}</span>
                    <span class="text-xs opacity-60">Vide</span>
                </div>
            `;
        }
    }
}

renderTeam();


const teamSection = document.getElementById('team');
if (teamSection) {
    teamSection.addEventListener('click', (event) => {
        const removeBtn = event.target.closest('.remove-team-btn');
        if (!removeBtn) return;

        const creatureId = removeBtn.dataset.id;
        myTeam = myTeam.filter(c => String(c.id) !== String(creatureId));
        renderTeam();
    });
}

// -------------------------------------------------------------
// 4. RECHERCHE
// -------------------------------------------------------------
const rech = document.querySelector("#search");
const filtersContainer = document.querySelector("#filters");
let currentType = "tous"; 

function searchFilter() {
    if (!rech) return;
    rech.addEventListener('keydown', async (e) => {
        if (e.key === "Enter") {
            const text = rech.value.toLowerCase().trim();
            if (!text) {
                init(allCreatures);
                return;
            }
            const creature = await research(text);
            if (creature) {
                init([creature]);
            }
        }
    });
}
searchFilter();

// -------------------------------------------------------------
// 5. FILTRE PAR TYPE
// -------------------------------------------------------------
if (filtersContainer) {
    filtersContainer.addEventListener("click", (event) => {
        const clickedBtn = event.target.closest('.type-btn');
        if (!clickedBtn) return; 

        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.classList.remove('bg-ink', 'text-white', 'border-ink');
        });
        clickedBtn.classList.add('bg-ink', 'text-white', 'border-ink');

        currentType = clickedBtn.getAttribute('data-type');
        
        if (currentType === "tous") {
            init(allCreatures);
        } else {
            const filtered = allCreatures.filter(c => c.primaryType?.toLowerCase() === currentType.toLowerCase());
            init(filtered);
        }
    });
}

// -------------------------------------------------------------
// 6. CRÉATION D'UNE CRÉATURE & VALIDATION
// -------------------------------------------------------------
function error(id, msg, inputId) {
    const errorEL = document.getElementById(id) || document.querySelector(id);
    if (errorEL) {
        errorEL.innerHTML = msg;
        errorEL.style.display = "block";
    }
    const input = document.querySelector(inputId);
    if (input) {
        input.classList.remove("border-brand-light");
        input.classList.add("border-red-600");
    }
}

function errorRemovale(id, inputId) {
    const errorEL = document.getElementById(id) || document.querySelector(id);
    if (errorEL) {
        errorEL.textContent = "";
        errorEL.style.display = "none";
    }
    const input = document.querySelector(inputId);
    if (input) {
        input.classList.remove("border-red-600");
        input.classList.add("border-brand-light");
    }
}

function idValidation() {
    const idInput = document.querySelector("#id");
    if (!idInput) return true;
    const id = idInput.value.trim();
    errorRemovale("idError", "#id");
    const regex = /^\d+$/;

    if (!id) {
        error("idError", "id required", "#id");
        return false;
    }
    if (!regex.test(id)) {
        error("idError", "the id should be a number", "#id");
        return false;
    }
    for (let i = 0; i < allCreatures.length; i++) {
        if (String(allCreatures[i].id) === String(id)) {
            error("idError", "this id already exist", "#id");
            return false;
        }
    }
    return true;
}

function nameValidation() {
    const nameInput = document.querySelector("#name");
    if (!nameInput) return true;
    const name = nameInput.value.trim();
    errorRemovale("nameError", "#name");

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

function attackValidation() {
    const attackInput = document.querySelector("#attack");
    if (!attackInput) return true;
    const attack = attackInput.value.trim();
    errorRemovale("attackError", "#attack");

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
        error("attackError", "the stats should be positive", "#attack");
        return false;
    }
    return true;
}

function defenceValidation() {
    const defenceInput = document.querySelector("#defence");
    if (!defenceInput) return true;
    const defence = defenceInput.value.trim();
    errorRemovale("defenceError", "#defence");

    if (defence === "") {
        error("defenceError", "stats is required", "#defence");
        return false;
    }
    if (isNaN(defence)) {
        error("defenceError", "stats should be a number", "#defence");
        return false;
    }
    if (Number(defence) > 5000) {
        error("defenceError", "the max stats is 5000", "#defence");
        return false;
    }
    if (Number(defence) < 0) {
        error("defenceError", "the stat should be positive", "#defence");
        return false;
    }
    return true;
}

function imgValidation() {
    const imgInput = document.querySelector("#img");
    if (!imgInput) return true;
    const img = imgInput.value.trim();
    errorRemovale("imgError", "#img");

    const regexImg = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|avif|bmp|svg)(\?.*)?$/i;
    if (img === "") {
        error("imgError", "image required", "#img");
        return false;
    } else if (!regexImg.test(img)) {
        error("imgError", "this is not a valid image url", "#img");
        return false;
    }
    return true;
}

function descriptionValidation() {
    const descInput = document.querySelector("#description");
    if (!descInput) return true;
    const description = descInput.value.trim();
    errorRemovale("descriptionError", "#description");

    if (description === "") {
        error("descriptionError", "description is required", "#description");
        return false;
    }
    if (description.length <= 9) {
        error("descriptionError", "description should be at least 10 letters", "#description");
        return false;
    }
    return true;
}

function levelValidation() {
    const levelInput = document.querySelector(".level");
    if (!levelInput) return true;
    const level = levelInput.value.trim();
    errorRemovale(".levelError", ".level");

    if (level === "") {
        error("levelError", "stats is required", ".level");
        return false;
    }
    if (!isNaN(level) && Number(level) > 12) {
        error("levelError", "the max level is 12", ".level");
        return false;
    }
    return true;
}

function formValidation() {
    const form = document.querySelector("#creature-form");
    if (!form) return;

    form.addEventListener("input", function (e) {
        const field = e.target.id;
        if (field === "id") idValidation();
        if (field === "name") nameValidation();
        if (field === "attack") attackValidation();
        if (field === "defence") defenceValidation();
        if (field === "img") imgValidation();
        if (field === "description") descriptionValidation();
        if (e.target.classList.contains("level")) levelValidation();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const idOk = idValidation();
        const nameOk = nameValidation();
        const attackOk = attackValidation();
        const defenceOk = defenceValidation();
        const imgOk = imgValidation();
        const levelOk = levelValidation();
        const descriptionOk = descriptionValidation();

        if (idOk && nameOk && attackOk && defenceOk && imgOk && levelOk && descriptionOk) {
            const newCreature = {
                id: document.querySelector("#id").value.trim(),
                name: document.querySelector("#name").value.trim(),
                primaryType: document.querySelector("[name='type']").value,
                level: "Niveau " + document.querySelector(".level").value.trim(),
                image: document.querySelector("#img").value.trim(),
                //description: document.querySelector("#description").value.trim(),
                HP: 50,
                ATTACK: Number(document.querySelector("#attack")?.value || 50),
                DEFENCE: Number(document.querySelector("#defence")?.value || 50)
            };
            
            allCreatures.push(newCreature);
            init(allCreatures);
            form.reset();
        }
    });
}

formValidation();