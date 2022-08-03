// create class for movie characters to take their name and superpower
class Character {
    constructor(name, superPower){
        this.name = name;
        this.superPower = superPower;
    }
}
// create class for movies to take the movie id, movie name, and empty array for characters, and methods to add/delete characters to the movie
class Movie {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.characters = [];
    }
    addCharacter(character){
        this.characters.push(character);
    }

    delete(character){
        let index = this.characters.indexOf(character);
        this.characters.splice(index, 1);
    }
}
// create variable to store movies in an array and a movieId to increment
let movies = [];
let movieId = 0;

// when creating a new movie > add new movie to the movie array
onClick('new-movie', () => {
    movies.push(new Movie(movieId++, getValue('new-movie-name')));
    drawDOM();
});

// create function to click button and return the element id
function onClick(id, action){
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}
// create simple function to get the value of the id
function getValue(id) {
    return document.getElementById(id).value;
}
// Create function to iterate over movies array and build out the tables
function drawDOM() {
    // clear out movieDiv
    let movieDiv = document.getElementById('movies');
    clearElement(movieDiv);
    // iterate over the movies and create a table, delete button, and add characters
    for (movie of movies){
        let table = createMovieTable(movie);
        let title = document.createElement('h2');
        title.innerHTML = movie.name;
        title.appendChild(createDeleteMovieButton(movie));
        movieDiv.appendChild(title);
        movieDiv.appendChild(table);
        for (character of movie.characters) {
            createCharacterRow(movie, table, character);
        }
    }
}
// create a function to create new character row starting at index 2 to add the characters name and superpower
function createCharacterRow(movie, table, character){
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = character.name;
    row.insertCell(1).innerHTML = character.superPower; 
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(movie, character));
}

// create delete row button that is used to delete the characters/superpowers from the table
function createDeleteRowButton(movie, character){
    let btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.innerHTML = 'Delete Avenger';
    btn.onclick = () => {
        let index = movie.characters.indexOf(character);
        movie.characters.splice(index, 1);
        drawDOM();
    };
    return btn;
}

// create a function similar to delete row to delete a movie from the movie array
function createDeleteMovieButton(movie) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.innerHTML = 'Delete Movie';
    btn.onclick = () => {
        let index = movies.indexOf(movie);
        movies.splice(index, 1);
        drawDOM();
    };
    return btn;
}
// function to add new characters to the movies
function createNewCharacterButton(movie) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.innerHTML = 'New Avenger';
    btn.onclick = () => {
        movie.characters.push(new Character(getValue(`name-input-${movie.id}`), getValue(`superPower-input-${movie.id}`)));
        drawDOM();
    };
    return btn;
}
// create function to build out the table when a movie is entered
function createMovieTable(movie) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-success table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let superPowerColumn = document.createElement('th');
    let submitColumn = document.createElement('th');
    nameColumn.innerHTML = 'Super Hero Name' 
    superPowerColumn.innerHTML = 'Super Power';
    submitColumn.innerHTML = 'Submit';
    row.appendChild(nameColumn);
    row.appendChild(superPowerColumn);
    row.appendChild(submitColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let superPowerTh = document.createElement('th');
    let submitColumnTh = document.createElement('th')
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${movie.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let superPowerInput = document.createElement('input');
    superPowerInput.setAttribute('id', `superPower-input-${movie.id}`);
    superPowerInput.setAttribute('type', 'text');
    superPowerInput.setAttribute('class', 'form-control');
    let newCharacterButton = createNewCharacterButton(movie);
    nameTh.appendChild(nameInput);
    superPowerTh.appendChild(superPowerInput);
    createTh.appendChild(newCharacterButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(superPowerTh);
    formRow.appendChild(createTh);
    return table;
}
// create a function to clear out the elements
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
