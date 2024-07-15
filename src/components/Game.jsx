import { useState, useEffect } from 'react'

// https://pokeapi.co/api/v2/{pokemon_name_lowercase}

const pokemon_list = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", 
    "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", 
    "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", 
    "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", 
    "sandshrew", "sandslash", "nidoran-m","nidoran-f", "nidorina", "nidoqueen", "nidorino", 
    "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", 
    "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", 
    "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", 
    "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", 
    "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", 
    "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", 
    "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", 
    "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", 
    "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", 
    "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", 
    "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", 
    "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", 
    "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", 
    "scyther", "jynx", "electabuzz", "magmar", "mr-mime", "pinsir", "tauros", "magikarp", 
    "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", 
    "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", 
    "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"
];
let highScore = 0;

async function query_pokemon(pokemon){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {mode: 'cors'});
        const data = await response.json();
        return data.sprites.front_default;
    }

    catch(error){
        console.log(error);
    }
}

export default function Game(){
    // States for the 3 pokemon urls.
    const [urls, setUrls] = useState([]);
    const [seenPokemon, setSeenPokemon] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // Function to handle selecting an image. Is an async() function because we have to do the api search again.
    const handleChoice = async(url) => {
        console.log('clicked');
        setSeenPokemon(prevSeenPokemon => [...prevSeenPokemon, url]);

        if(seenPokemon.includes(url)){ // On game over, reset the score & 'seen' array.
            alert(`Game Over :( \nYour score was: ${score}`);
            setSeenPokemon([]);
            setScore(0);

            if (score > highScore){
                setHighScore(score);
            }
        }

        else{
            // Increment the score
            setScore(score + 1);
            // Generate new set of 3 Pokémon images
            const poke1 = randomPokemon();
            const poke2 = randomPokemon();
            const poke3 = randomPokemon();

            const displayed_pokemon = [poke1, poke2, poke3];
            const promises = displayed_pokemon.map(pokemon => query_pokemon(pokemon));
            const imageUrls = await Promise.all(promises);
            setUrls(imageUrls);
        }
    }

    // Function to handle picking a random pokemon
    const randomPokemon = () => {
        let pokemon;
        pokemon = pokemon_list[Math.floor(Math.random() * pokemon_list.length)];
        return pokemon;
    }


    // Recall that we have to use useEffect() since we're reaching into an outside source.
    // You need this because: The async() function might not actually be done by the time React renders it.
    // Thus, useEffect() tells React to mount it once the URL is actually obtained.
    useEffect(() => {
        async function fetchData() {
            const poke1 = randomPokemon();
            const poke2 = randomPokemon();
            const poke3 = randomPokemon();

            const displayed_pokemon = [poke1, poke2, poke3];
            const promises = displayed_pokemon.map(pokemon => query_pokemon(pokemon));
            const imageUrls = await Promise.all(promises);

            setUrls(imageUrls);
        }
        fetchData();
    }, [])


    return (
        <>
            <div className="score-container">
                <div id="high-score">High Score: {highScore}</div>
                <div id="current-score">Current Score: {score}</div>
            </div>

            <div className="pokemon-img-container">
                {urls.map((url, index) => (
                    <img className='pokemon-img' src={url} key={index} onClick={(e) => handleChoice(url)}/> 
                ))}
            </div>

        </>
    )
}