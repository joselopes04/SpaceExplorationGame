const fuelModal = document.getElementById("fuelModal")

class Player extends Component {
    //Constructor of the player
    constructor(x, y, w, h, speed, fuel, img) {
        super(x, y, w, h, speed, fuel, img)

        //???
        this.currentFrame = 0

        //add the image
        let playerImg = new Image();
        playerImg.src = "assets/rocketNoBG.png"
        this.img = playerImg
        this.fuel = 100
        this.rotation = 0;
    }

    render(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    //movemnt of the player
    move(game) {
        if (this.fuel >= 0.5) {
            if (game.leftPressed && this.x > 0) {
                this.fuel -= this.speed * 0.0008;
                if (this.x < game.canvas.width * 1 / 5) {
                    //"infinite canvas"
                    if (game.level.currentX > 100000 * 1 / 10) {
                        this.x -= this.speed
                    }
                    else {
                        game.scrollRight(this.speed)
                    }
                }
                else {
                    this.x -= this.speed
                }
                game.level.currentX -= this.speed
            }

            if (game.rightPressed && this.x < game.canvas.width - this.w) {
                this.fuel -= this.speed * 0.0008;
                if (this.x > game.canvas.width * 4 / 5) {
                    //"infinite canvas"
                    if (game.level.currentX > 100000 * 9 / 10) {
                        this.x += this.speed
                    }
                    else {
                        game.scrollLeft(this.speed)
                    }
                }
                else {
                    this.x += this.speed
                }
                game.level.currentX += this.speed
            }
            if (game.upPressed && this.y > 0) {
                this.fuel -= this.speed * 0.0008;
                if (this.y < game.canvas.height * 1 / 5) {

                    //"infinite canvas"
                    if (game.level.currentY > 100000 * 1 / 10) {
                        this.y -= this.speed
                    }
                    else {
                        game.scrollDown(this.speed)
                    }
                }
                else {
                    this.y -= this.speed
                }
                game.level.currentY -= this.speed
            }
            if (game.downPressed && this.y < game.canvas.height - this.h) {
                this.fuel -= this.speed * 0.0008;
                if (this.y > game.canvas.height * 4 / 5) {

                    //"infinite canvas"
                    if (game.level.currentY > 100000 * 9 / 10) {
                        this.y += this.speed
                    }
                    else {
                        game.scrollUp(this.speed)
                    }
                }
                else {
                    this.y += this.speed
                }
                game.level.currentY += this.speed
            }
        } else {
            //Run out of fuel
            fuelModal.style.display = "flex"
        }
    }

    calculateDistance(planetX, planetY) {
       return Math.sqrt(Math.pow((game.level.currentX-planetX),2) + Math.pow((game.level.currentY-planetY),2))
    }
}