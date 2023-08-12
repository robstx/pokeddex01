const pokemonListElement = document.querySelector('.pokemon-list');
const searchInput = document.getElementById('search-input');
const detailsContainer = document.querySelector('.pokemon-details-container');
const detailsContent = document.querySelector('.pokemon-details');

let pokemonList = [];

async function fetchPokemonData(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return data;
}

async function displayPokemon(pokemonData) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  pokemonCard.classList.add(pokemonData.types[0].type.name);

  const pokemonNumber = pokemonData.id;
  const imageUrl = pokemonData.sprites.front_default;
  const name = pokemonData.name;
  const types = pokemonData.types.map(type => type.type.name).join(', ');

  pokemonCard.innerHTML = `
    <img src="${imageUrl}" alt="${name}">
    <h3>${name}</h3>
    <p>#${pokemonNumber}</p>
    <p>Types: ${types}</p>
  `;

  pokemonCard.addEventListener('click', () => showPokemonDetails(pokemonData));

  pokemonListElement.appendChild(pokemonCard);
}

async function fetchAllPokemons() {
  for (let i = 1; i <= 351; i++) {
    const pokemonData = await fetchPokemonData(i);
    pokemonList.push(pokemonData);
    displayPokemon(pokemonData);
  }
}

function searchPokemon(searchTerm) {
  const filteredPokemons = pokemonList.filter(pokemon => pokemon.name.includes(searchTerm));
  pokemonListElement.innerHTML = '';
  filteredPokemons.forEach(displayPokemon);
}

// ... Código existente ...

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function searchPokemon(searchTerm) {
  if (searchTerm.trim() === "") {
    pokemonListElement.innerHTML = '';
    pokemonList.forEach(displayPokemon);
    return;
  }

  let filteredPokemons = [];
  if (isNumeric(searchTerm)) {
    const pokemonNumber = parseInt(searchTerm);
    filteredPokemons = pokemonList.filter(pokemon => pokemon.id === pokemonNumber);
  } else {
    filteredPokemons = pokemonList.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));
  }

  pokemonListElement.innerHTML = '';
  filteredPokemons.forEach(displayPokemon);
}

// ... Código existente ...


function showPokemonDetails(pokemonData) {
  const pokemonDetailsContainer = document.querySelector('.pokemon-details-container');
  const pokemonDetails = document.querySelector('.pokemon-details');

  // Remova as classes de tipo anteriores antes de adicionar a classe de tipo atual
  pokemonDetails.classList.remove(...pokemonDetails.classList);
  pokemonDetails.classList.add('pokemon-details', pokemonData.types[0].type.name);

  const pokemonImage = document.querySelector('.pokemon-image');
  const pokemonName = document.querySelector('.pokemon-name');
  const pokemonNumber = document.querySelector('.pokemon-number');
  const pokemonHeight = document.querySelector('.pokemon-height');
  const pokemonWeight = document.querySelector('.pokemon-weight');
  const pokemonTypes = document.querySelector('.pokemon-types');

  pokemonImage.style.backgroundImage = `url(${pokemonData.sprites.front_default})`;
  pokemonName.textContent = pokemonData.name;
  pokemonNumber.textContent = `#${pokemonData.id}`;
  pokemonHeight.textContent = `Height: ${pokemonData.height} dm`;
  pokemonWeight.textContent = `Weight: ${pokemonData.weight} hg`;
  pokemonTypes.textContent = `Types: ${pokemonData.types.map(type => type.type.name).join(', ')}`;

  pokemonDetailsContainer.classList.add('active');
}

function closePokemonDetails() {
  detailsContainer.classList.remove('active');
}

searchInput.addEventListener('input', (event) => searchPokemon(event.target.value.toLowerCase()));

fetchAllPokemons();

