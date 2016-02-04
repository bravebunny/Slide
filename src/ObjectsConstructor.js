/* global Phaser */
var ObjectsConstructor = function (game, level) {
  this.game = game
  this.lvl = level
}

ObjectsConstructor.prototype = {

  createDoor: function (x, y) {
    var sprite = this.game.add.sprite((x + 1) * 32 - 16, (y + 1) * 32 - 16, 'door')
    sprite.anchor.setTo(0.5, 0.5)
    this.game.physics.arcade.enable(sprite)
    sprite.body.immovable = true
    sprite.body.moves = false
    this.lvl.door.push(sprite)
  },

  // position: 0 = down | 1 = right | 2 = up | 3 = left
  createLock: function (x, y, position, name) {
    var sprite = null
    if (position === 0) sprite = this.game.add.sprite((x + 1) * 32 - 8, (y + 1) * 32 - 4, 'lock')
    if (position === 1) sprite = this.game.add.sprite((x + 1) * 32 - 4, (y + 1) * 32 - 24, 'lock')
    if (position === 2) sprite = this.game.add.sprite((x + 1) * 32 - 24, (y + 1) * 32 - 28, 'lock')
    if (position === 3) sprite = this.game.add.sprite((x + 1) * 32 - 28, (y + 1) * 32 - 8, 'lock')
    this.game.physics.arcade.enable(sprite)
    sprite.anchor.setTo(0.5, 0.5)
    sprite.body.setSize(16, 16, 0, 0)
    if (name) sprite.name = name
    else sprite.name = 'none'
    this.game.add.tween(sprite).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100, 1000, true)
    this.lvl.lock.push(sprite)
  },

  // position: 0 = down | 1 = right | 2 = up | 3 = left
  createObject: function (x, y, position, color, name) {
    var sprite = null
    if (position === 0) sprite = this.game.add.sprite((x + 1) * 32 - 8, (y + 1) * 32 - 4, color)
    if (position === 1) sprite = this.game.add.sprite((x + 1) * 32 - 4, (y + 1) * 32 - 24, color)
    if (position === 2) sprite = this.game.add.sprite((x + 1) * 32 - 24, (y + 1) * 32 - 28, color)
    if (position === 3) sprite = this.game.add.sprite((x + 1) * 32 - 28, (y + 1) * 32 - 8, color)
    this.game.physics.arcade.enable(sprite)
    sprite.anchor.setTo(0.5, 0.5)
    sprite.body.setSize(16, 16, 0, 0)
    if (name) sprite.name = name
    else sprite.name = 'none'
    this.game.add.tween(sprite).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100, 1000, true)
    this.lvl.objectP.push(sprite)
  },

  createRectangle: function (x, y, width, height) {
    var graphic = this.game.add.graphics(0, 0)
    graphic.beginFill(0x363636)
    graphic.drawRect(x * 32, y * 32, width * 32, height * 32)
    this.lvl.rectangle.push(graphic)
  },

  render: function () {}
}
