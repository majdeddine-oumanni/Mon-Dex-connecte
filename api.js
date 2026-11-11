export async function getCreatures(limit, offset) {
    try{

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

        if(!response.ok){
            throw new Error("the fetch wasn't successful");
        }
 
        let data = await response.json(); 
        let results = data.results;
        
        let promises = results.map(async (pokemon)=>{
            let res = await fetch(pokemon.url);
            return res.json();
        })
        let customizedCreatures = [];

        let creatures = await Promise.all(promises);
        creatures.forEach((creature)=>{
            customizedCreatures.push({
                id: creature.id,
                name: creature.species.name,
                image: creature.sprites.other?.['official-artwork']?.front_default || creature.sprites.front_default,
                primaryType: creature.types[0]?.type?.name || 'normal',
                totalStats: creature.stats.reduce((sum, stat) => sum + stat.base_stat, 0),
                HP: creature.stats[0].base_stat,
                ATTACK: creature.stats[1].base_stat,
                DEFENCE: creature.stats[2].base_stat
            })
        })

        return customizedCreatures;

    }catch(error){
        console.error(error);
    }
}