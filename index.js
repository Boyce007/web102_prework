/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(game=>{
        const gameCard = document.createElement("div")
        // add the class game-card to the list
        gameCard.classList.add("game-card")
        // set the inner HTML using a template literal to display some info 

        gameCard.innerHTML= `
        <img src="${game.img}" alt="${game.name}" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
    `
    // append the game to the games-container
    gamesContainer.appendChild(gameCard)

    })       

}


// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions =  GAMES_JSON.reduce((acc,game)=>{
    return acc + game.backers;
},0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `
${totalContributions.toLocaleString('en-US')}
`
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_raised = GAMES_JSON.reduce((acc,game) =>{
    return acc + game.pledged
},0)

// set inner HTML using template literal
raisedCard.innerHTML = `
${total_raised.toLocaleString('en-US')}
`


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const game_count = GAMES_JSON.reduce((acc,game)=>{
return acc+1
},0)
gamesCard.innerHTML= 
`${game_count.toLocaleString('en-US')}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const not_fully_funded  = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal
    
    })
    
    addGamesToPage(not_fully_funded)



    // use the function we previously created to add the unfunded games to the DOM

}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fully_funded = GAMES_JSON.filter((game=>{
        return game.pledged >= game.goal
    }))

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fully_funded)

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click',filterUnfundedOnly)
fundedBtn.addEventListener('click',filterFundedOnly)
allBtn.addEventListener('click',showAllGames)
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const underfunded = GAMES_JSON.reduce((acc,game)=>{
    return acc+1
},0)

// create a string that explains the number of unfunded games using the ternary operator

const display  = `A total of $${total_raised} has been raised 
 ${underfunded>0 ? `We still need funding for ${underfunded} games please support if you can`:
 "Thank you for all your support in funding our games" }`


// create a new DOM element containing the template string and append it to the description container
const message = document.createElement("div")
message.classList.add("message-to-supporters")
        // set the inner HTML using a template literal to display some info 
message.innerHTML= `
<p>${display}</p>
`
descriptionContainer.appendChild(message)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [first,second,...rest] = sortedGames
console.log(first)
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledgedGame = document.createElement('div')
topPledgedGame.classList.add('top-game-card')
topPledgedGame.innerHTML = 
`
        <img src="${first.img}" alt="${first.name}" />
        <h3>${first.name}</h3>
        <p>${first.description}</p>
        <p>amount raised: $$ {first.pledged}</p>
        <p> total contributors ${first.backers}
    `

firstGameContainer.appendChild(topPledgedGame)
// do the same for the runner up item
const secPledgedGame = document.createElement('div')
secPledgedGame.classList.add('2nd-game-card')
secPledgedGame.innerHTML = 
`
        <img src="${second.img}" alt="${second.name}" />
        <h3>${second.name}</h3>
        <p>${second.description}</p>
        <p>amount raised: $ ${second.pledged}</p>
        <p>total contributors ${second.backers}
`
secondGameContainer.appendChild(secPledgedGame)