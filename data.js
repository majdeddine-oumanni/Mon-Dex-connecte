// =============================================================
// data.js — les créatures de VOTRE univers
// =============================================================
// TODO : remplissez ce tableau avec au moins 12 créatures
// (Pokémon, Digimon ou Yu-Gi-Oh!), en respectant ce format :
//
// {
//   id: 1,                                   // "#" suivi de 3 chiffres
//   name: "Exemple",                              // texte
//   type: "Feu",                                  // une valeur d'une liste fixe
//   level: "Base",                                // texte
//   stats: { hp: 45, attack: 49, defence: 49 },   // 3 nombres de 0 à 999
//   image: "https://example.com/001.png",         // lien https vers une image
//   description: "Une courte description."        // 10 à 200 caractères
// }
//
// Pensez à citer la source de vos images dans le README.


export function getCreatures() {
    const creatures = [
        {
            id: 1,
            name: "Gazelle des Légendes",
            type: "fire",
            // icon: icons.beast,
            level: "Niveau 4",
            stats: {hp: 45, attack: 110, defence: 90 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",
            description:
            "Une gazelle rapide qui court plus vite que le vent. Les autres bêtes la respectent comme une reine.",
        },

        {
            id: 2,
            name: "Bœuf de Guerre",
            type: "grass",
            // // icon: icons.beastWarrior,
            level: "Niveau 4",
            stats: {hp: 65, attack: 170, defence: 100 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/2.png",
            description:
            "Un guerrier mi-homme mi-bœuf, fort et courageux. Il fonce droit sur ses ennemis avec sa hache.",
        },

        {
            id: 3,
            name: "Horakhty Créateur",
            type: "fire",
            // // icon: icons.creatorGod,
            level: "Niveau 10",
            stats: {hp: 40, attack: 250, defence: 250 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/3.png",
            description:
            "Un dieu très rare qui a créé la lumière. Personne n'ose le défier.",
        },

        {
            id: 4,
            name: "Dragon Pare-feu",
            type: "electric",
            // // icon: icons.cyberse,
            level: "Niveau 5",
            stats: {hp: 50, attack: 160, defence: 110 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/4.png",
            description:
            "Un dragon numérique qui vit dans les réseaux. Il protège le monde virtuel contre les intrus.",
        },

        {
            id: 5,
            name: "Tyrannosaure Conducteur",
            type: "fire",
            // // icon: icons.dinosaur,
            level: "Niveau 8",
            stats: {hp: 49, attack: 240, defence: 180 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/5.png",
            description:
            "Un énorme dinosaure qui fait trembler le sol. Quand il attaque, rien ne l'arrête.",
        },

        {
            id: 6,
            name: "Dragon du Ciel Divin",
            type: "ice",
            // // icon: icons.divineBeast,
            level: "Niveau 10",
            stats: {hp: 230, attack: 300, defence: 200 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/6.png",
            description:
            "Une bête sacrée qui vole au-dessus des nuages. Plus ses ennemis sont nombreux, plus elle devient forte.",
        },

        {
            id: 7,
            name: "Dragon Blanc aux Yeux Bleus",
            type: "darkness",
            // // icon: icons.dragon,
            level: "Niveau 8",
            stats: {hp: 405, attack: 300, defence: 250 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/7.png",
            description:
            "Un dragon légendaire à l'attaque puissante. Il est très rare et très redouté.",
        },

        {
            id: 8,
            name: "Ange des Ténèbres",
            type: "fire",
            // // icon: icons.fiend,
            level: "Niveau 10",
            stats: {hp: 450, attack: 270, defence: 150 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/8.png",
            description:
            "Un démon qui garde un amour fou pour ses amis. Il devient très dangereux quand on le trahit.",
        },

        {
            id: 9,
            name: "Poisson Arc-en-ciel",
            type: "water",
            // // icon: icons.fish,
            level: "Niveau 2",
            stats: {hp: 95, attack: 60, defence: 70 },
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/9.png",
            description:
            "Un joli poisson aux sept couleurs. Il nage vite et se cache facilement.",
        }
    ];
    return creatures;
}