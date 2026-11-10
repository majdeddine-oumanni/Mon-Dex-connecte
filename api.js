export async function getCreatures(limit) {
    try{

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        
        if(!response.ok){
            throw new Error("the fetch wasn't successful");
        }

        let data = await response.json();
        let results = data.results;
        
        let promises = results.map(async (pokemon)=>{
            let res = await fetch(pokemon.url);
            return res.json();
        })

        let creatures = await Promise.all(promises);
        console.log(creatures);
        return creatures;

    }catch(error){
        console.error(error);
    }
}