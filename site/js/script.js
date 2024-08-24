const pokemonNome = document.querySelector('.pokemon_nome');
const pokemonNumero = document.querySelector('.pokemon_numero');
const pokemonImg = document.querySelector('.pokemon_img');

const form = document.querySelector('.form'); 
const input = document.querySelector('.input_search');

const botaoprev = document.querySelector('.btn_prev');
const botaonext = document.querySelector('.btn_next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    /// esse if aqui serve pra quando a pessoa pesquisa algum pokemon que n existe ai nao retorna nada
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;

    }
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImg.style.display = 'block'
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = '';
    searchPokemon = data.id;
    } else{
        pokemonImg.style.display = 'none';
        pokemonNome.innerHTML = 'not found';
        pokemonNumero.innerHTML = '!';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});


botaoprev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
    renderPokemon(searchPokemon)
    }
    
});

botaonext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);

