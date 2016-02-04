/* global Phaser, localStorage*/
var preloadGame = function (game) {}

preloadGame.prototype = {

  preload: function () {
    this.game.load.image('Pastel', 'assets/level/Pastel.png') // loading the tileset image
    this.game.load.tilemap('hospiceMap', 'assets/level/hospiceLevel.json', null, Phaser.Tilemap.TILED_JSON) // loading the tilemap file
    this.game.load.tilemap('homeMap', 'assets/level/homeTutorial.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.tilemap('gardenMap', 'assets/level/gardenLevel.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.tilemap('streetMap', 'assets/level/streetLevel.json', null, Phaser.Tilemap.TILED_JSON)

    this.game.load.image('yellow', 'assets/sprites/yellow.png') // loading the tileset image
    this.game.load.image('blue', 'assets/sprites/blue.png')
    this.game.load.image('lightGreen', 'assets/sprites/lightGreen.png')
    this.game.load.image('red', 'assets/sprites/red.png')
    this.game.load.image('door', 'assets/sprites/door.png')
    this.game.load.image('lock', 'assets/sprites/lock.png')
    this.game.load.image('playerWithHat', 'assets/sprites/playerWithHat.png')

    this.game.load.image('spriteMain', 'assets/sprites/player.png')
  },

  create: function () {
    localStorage.setItem('hat', false)
    localStorage.setItem('key', false)
    this.game.state.start('GameMananger', true, false)
  }
}
