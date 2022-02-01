const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie-select');

let ticketPrice = +movieSelect.value; //the + turns it into a number type, otherwise it will be a string by default.

populateUI();

//FUNCTIONS

//Save selected movie Index and ticket price
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Updating the number of selected seats
function updateSelectedSeats(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //We convert the node list intto a regular array so we will be able to use array methods. I then map through it and return a new array containing the index of each seat.
    const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));

    //Saving an array to Local Storage, using json.stringify to make it a json object
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;
}


//Collect data from  local storage and populate UI with it
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); //Collect selected seats
    
    //Check selected seats, add 'selected' class to selected ones.
    if(selectedSeats !==null && selectedSeats.length >0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !==null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}




//EVENTS

//Movie Change Event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedSeats();
})

//Seat Click Event
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !(e.target.classList.contains('occupied'))
    ) {
        e.target.classList.toggle('selected');
        updateSelectedSeats();
    }
}) 
//instead of adding a listener on each seat, i added it on the container and then i check for the click on the element of my interest. I do that by checking the classList of the e.target! (e stands for "event")

//initial count and total set
updateSelectedSeats();
