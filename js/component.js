class Component {
  //Constructor of the player
  constructor(x, y, w, h, speed, img) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.speed = speed
    if (img) this.img = img
  }

  //render the player
  render(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
  }

  //Check colisions
  collides(obj) {
    if (
      this.x < obj.x + obj.w &&
      this.x + this.w > obj.x &&
      this.y < obj.y + obj.h &&
      this.h + this.y > obj.y
    ) {
      return true
    }
    else {
      return false
    }
  }
}

class Planet {
  //Constructor of the planet
  constructor(x, y, planetImg, w, h,difX,difY) {
    this.x = x
    this.y = y
    this.planetImg = planetImg
    this.w = w
    this.h = h
    this.difX = 0
    this.difY = 0
  }

  render(planetImg, ctx) {
    ctx.drawImage(planetImg, this.x, this.y, this.w, this.h);
  }

  collides(obj) {
    if (
      this.x < obj.x + obj.w &&
      this.x + this.w > obj.x &&
      this.y < obj.y + obj.h &&
      this.h + this.y > obj.y
    ) {
      return true
    }
    else {
      return false
    }
  }

  searchPlanet(){
    
  }
}