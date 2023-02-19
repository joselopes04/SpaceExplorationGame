let game = new Game()

//constants
const startModal = document.getElementById("startModal")
const searchModal = document.getElementById("searchModal");
const startBtn = document.getElementById("startBtn")
const searchBtn = document.getElementById("searchBtn")
const closeSearchModal = document.getElementById("closeSearchModal")
const resetBtn = document.getElementById("resetBtn")
const destinyTxt = document.getElementById("destinyTxt")

//Movement
function move() {
    // inputs from the user
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
            case "s":
                game.downPressed = true
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
            case "w":
                game.upPressed = true
                break;
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
            case "a":
                game.leftPressed = true
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
            case "d":
                game.rightPressed = true
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    });
    
    window.addEventListener("keyup", (event) => {
        switch (event.key) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
            case "s":
                game.downPressed = false
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
            case "w":
                game.upPressed = false
                break;
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
            case "a":
                game.leftPressed = false
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
            case "d":
                game.rightPressed = false
                break;
            case "q":
                searchModal.classList.remove("hidden");
                searchBox.focus();
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    });
    
}

//Start game modal
startBtn.addEventListener("click", () => {
    startModal.classList.add("hidden")
    move()
})

//Game over modal
resetBtn.addEventListener("click", () => {
    fuelModal.style.display = "none"
    window.location.reload();
})

searchBtn.addEventListener("click", (event) => {
    event.preventDefault(); //Stop refreshing
    let searchBoxValue = document.getElementById('searchBox').value
    searchBoxValue = searchBoxValue.toLowerCase()
    let closeModal = false;
    switch (searchBoxValue) {
        case "mercury":
            game.destiny = 0
            closeModal = true;
            break;
        case "venus":
            game.destiny = 1
            closeModal = true;
            break;
        case "earth":
            game.destiny = 2
            closeModal = true;
            break;
        case "moon":
            game.destiny = 3
            closeModal = true;
            break;
        case "mars":
            game.destiny = 4
            closeModal = true;
            break;
        case "jupiter":
            game.destiny = 5
            closeModal = true;
            break;
        case "saturn":
            game.destiny = 6
            closeModal = true;
            break;
        case "uranus":
            game.destiny = 7
            closeModal = true;
            break;
        case "neptune":
            game.destiny = 8
            closeModal = true;
            break;
        default:
            alert("Please spell the name correctly")
    }
    if (closeModal) {
        destinyTxt.innerHTML = searchBoxValue.charAt(0).toUpperCase() + searchBoxValue.slice(1)
        searchModal.classList.add("hidden");
    }
})

closeSearchModal.addEventListener("click", () => {
    searchModal.classList.add("hidden");
    searchBox.value = ""
    destinyTxt.innerHTML = "None"
})

// Página carregada
window.onload = () => {
    game.start()
    setInterval(game.update, 1000 / 60)
    setInterval(game.movePlanet, 2)
}