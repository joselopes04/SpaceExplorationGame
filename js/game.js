const xVal = document.getElementById("xVal")
const yVal = document.getElementById("yVal")
const speedVal = document.getElementById("speedVal")
const fuelVal = document.getElementById("fuelVal")
const distanceFromPlanetTxt = document.getElementById("distanceFromPlanetTxt")

//Math
function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

class Game {

    //Initialize the obejct game
    constructor() {
        this.canvas = document.getElementById("jogo")
        this.ctx = this.canvas.getContext('2d')
        this.canvas.height = innerHeight - 6
        this.canvas.width = innerWidth - 2

        this.leftPressed = false
        this.upPressed = false
        this.downPressed = false
        this.rightPressed = false

        this.planets = []

        this.destiny = null;

        let sunImg = new Image();
        sunImg.src = "assets/planets/sunNoBG.png"

        this.sun = new Planet(580, 580, sunImg, 1000, 1000)
        this.player = new Player(500, 500, 100, 100, 5, 100, null)

        this.level = {
            currentX: this.player.x,
            currentY: this.player.y,
            width: 100000,
            height: 100000
        }
    }

    //Move the game
    scrollLeft(speed) {
        this.backgroundX -= speed
        this.planets.forEach(planet => {
            planet.x -= speed
            planet.difX -= speed
        })
        this.sun.x -= speed
    }

    scrollRight(speed) {
        this.backgroundX += speed
        this.planets.forEach(planet => {
            planet.x += speed
            planet.difX += speed
        })
        this.sun.x += speed
    }

    scrollUp(speed) {
        this.backgroundY -= speed
        this.planets.forEach(planet => {
            planet.y -= speed
            planet.difY -= speed
        })
        this.sun.y -= speed
    }

    scrollDown(speed) {
        this.backgroundY += speed
        this.planets.forEach(planet => {
            planet.y += speed
            planet.difY += speed
        })
        this.sun.y += speed
    }

    //Begin the game
    start = () => {
        startModal.classList.remove("hidden")
        //Images
        let mercuryImg = new Image();
        mercuryImg.src = "assets/planets/mercuryNoBG.png"
        let venusImg = new Image();
        venusImg.src = "assets/planets/venusNoBg.png"
        let earthImg = new Image();
        earthImg.src = "assets/planets/earthNoBG.png"
        let moonImg = new Image();
        moonImg.src = "assets/planets/moonNoBg.png"
        let marsImg = new Image();
        marsImg.src = "assets/planets/marsNoBg.png"
        let jupiterImg = new Image();
        jupiterImg.src = "assets/planets/jupiterNoBg.png"
        let saturnImg = new Image();
        saturnImg.src = "assets/planets/saturnNoBg.png"
        let uranusImg = new Image();
        uranusImg.src = "assets/planets/uranusNoBg.png"
        let neptuneImg = new Image();
        neptuneImg.src = "assets/planets/neptuneNoBg.png"

        /*
        Sizes done by this scale.
        rocky planets scale 1cm = 100px
        gaseous planets scale 30cm = 800px

        distances done by this scale
        rocky planets scale 1cm = 100px

        with base on this website https://planetario.ufsc.br/o-sistema-solar/
        */

        //Create the planets
        let mercury = new Planet(0, 0, mercuryImg, 100, 100)
        let venus = new Planet(-1080, -1080, venusImg, 250, 250)
        let earth = new Planet(-1500, -1500, earthImg, 270, 270)
        let moon = new Planet(-1600, -1600, moonImg, 70, 70)
        let mars = new Planet(-2300, -2300, marsImg, 140, 140)
        let jupiter = new Planet(-7800, -7800, jupiterImg, 800, 800)
        let saturn = new Planet(-14300, -14300, saturnImg, 700, 700)
        let uranus = new Planet(-28700, -28700, uranusImg, 500, 500)
        let neptune = new Planet(-45000, -45000, neptuneImg, 480, 480)

        //put the planets on the array
        this.planets.push(mercury)
        this.planets.push(venus)
        this.planets.push(earth)
        this.planets.push(moon)
        this.planets.push(mars)
        this.planets.push(jupiter)
        this.planets.push(saturn)
        this.planets.push(uranus)
        this.planets.push(neptune)
    }

    //Move the planets
    movePlanet = () => {
        this.planets.forEach((planet) => {
            let sunX = this.sun.x + this.sun.w / 2
            let sunY = this.sun.y + this.sun.h / 2

            let planetX = planet.x + planet.w / 2
            let planetY = planet.y + planet.h / 2

            let distanceX = (sunX - planetX)
            let distanceY = (sunY - planetY)

            // let distancia = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
            let angulo = calcAngleDegrees(distanceX, distanceY)

            planet.y += Math.cos(toRadians(angulo))
            planet.x -= Math.sin(toRadians(angulo))
        });
    }

    //Update the image every frame
    update = () => {

        //Print values on the screen
        xVal.innerHTML = this.level.currentX
        yVal.innerHTML = this.level.currentY
        speedVal.innerHTML = this.player.speed
        fuelVal.innerHTML = Math.round(this.player.fuel)

        if (this.destiny != null) {
            distanceFromPlanetTxt.innerHTML = Math.round(this.player.calculateDistance(this.planets[this.destiny].x - this.planets[this.destiny].difX, this.planets[this.destiny].y - this.planets[this.destiny].difY))
        }

        this.player.move(this)
        this.draw()

        //Verifify colisions with the planets 
        this.planets.forEach((planet, index) => {
            if (planet.collides(this.player)) {
                switch (index) {
                    case 0:
                        console.log("Colliding planet: Mercury");
                        break;
                    case 1:
                        console.log("Colliding planet: Venus");
                        break;
                    case 2:
                        console.log("Colliding planet: Earth");
                        break;
                    case 3:
                        console.log("Colliding planet: Moon");
                        break;
                    case 4:
                        console.log("Colliding planet: Mars");
                        break;
                    case 5:
                        console.log("Colliding planet: Jupiter");
                        break;
                    case 6:
                        console.log("Colliding planet: Saturn");
                        break;
                    case 7:
                        console.log("Colliding planet: Uranus");
                        break;
                    case 8:
                        console.log("Colliding planet: Neptune");
                        break;
                    default:
                        console.log("Colliding planet: Unknown");
                        break;
                }
            }
        });
    }

    //draw objects on the game
    draw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        //draw the player
        this.player.render(this.ctx)
        //draw sun
        this.sun.render(this.sun.planetImg, this.ctx)

        //draw plannets
        this.planets.forEach(planet => {
            let img = planet.planetImg
            planet.render(img, this.ctx)
        })
    }
}