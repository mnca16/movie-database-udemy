const addMovieModal = document.getElementById('add-modal');
/*Other ways to selec the button 
const addMovieModel = document.querySelector('#add-modal');
const addMovieModel = document.body.children[1];
*/
const startAddMovieButton = document.querySelector('header button')
/*Other ways to select the button
const startAddMovieButton = document.querySelector('header').lastElementChild;
*/
const backdrop = document.getElementById('backdrop');
/*other way to select
const backdrop = document.body.firstElementChild;
*/
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

//practicing list selection
const userInputs = addMovieModal.querySelectorAll('input');
/*other way to select
const userInput = addMovieModal.getElementsByTagName('input')
*/

const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];



const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const deleteMovie = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if(movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.removeChild(listRoot.children[movieIndex]);
    //listRoot.children[movieIndex].remove(); another way to select the removing

};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    //deleteMovie(movieId);
};

const renderNewMovieElement = (id, tittle, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
      <div class="movie-element__image">
         <img src="${imageUrl}" alt="${tittle}">
      </div>
      <div class"movie-element__info">
         <h2>${tittle}</h2>
         <p>${rating}/5 stars</p>
      </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};


const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModalHandler = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInput();

};

const addMovieHandler = () => {
    const tittleValue = userInputs[0].value;
    const imageUlrValue = userInputs[1].value;
    const ratingValue = userInputs[2].value

    if (
        tittleValue.trim() === '' ||
        imageUlrValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
        ) {
            alert('Please enter valid values (rating between 1 and 5).');
            return;
        }
    
        const newMovie = {
            id: Math.random().toString(),
            tittle: tittleValue,
            image: imageUlrValue,
            rating: ratingValue
        };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.tittle, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
 closeMovieModal();
 closeMovieDeletionModal();
};

startAddMovieButton.addEventListener('click', showMovieModalHandler);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler)