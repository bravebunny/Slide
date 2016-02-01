/* global Phaser */
var ObjectsConstructor = function (game, level) {
  this.game = game
  this.lvl = level
}

ObjectsConstructor.prototype = {

  createLock: function (x, y) {
    this.lvl.lock.push(this.lvl.add.sprite(x, y, 'lock'))
    this.lvl.physics.arcade.enable(this.lvl.lock[this.lvl.lockIndex])
    this.lvl.lock[this.lvl.lockIndex].anchor.setTo(0.5, 0.5)
    this.lvl.lock[this.lvl.lockIndex].body.setSize(16, 16, 0, 0)
    this.lvl.add.tween(this.lvl.lock[this.lvl.lockIndex]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100, 1000, true)
    this.lvl.lockIndex ++
  },

  createDoor: function (x, y) {
    this.lvl.door.push(this.lvl.add.sprite(x, y, 'door'))
    this.lvl.physics.arcade.enable(this.lvl.door[this.lvl.doorIndex])
    this.lvl.door[this.lvl.doorIndex].anchor.setTo(0.5, 0.5)
    this.lvl.door[this.lvl.doorIndex].body.immovable = true
    this.lvl.door[this.lvl.doorIndex].body.moves = false
    this.lvl.doorIndex ++
  },

  createRectangle: function (x, y, width, height) {
    this.lvl.rectangle.push(this.lvl.add.graphics(0, 0))
    this.lvl.rectangle[this.lvl.rectangleIndex].beginFill(0x363636)
    this.lvl.rectangle[this.lvl.rectangleIndex].drawRect(x, y, width, height)
    this.lvl.rectangleIndex ++
  },

  createObject: function (x, y, color) {
    this.lvl.objectP.push(this.lvl.add.sprite(x, y, color))
    this.lvl.physics.arcade.enable(this.lvl.objectP[this.lvl.objectIndex])
    this.lvl.objectP[this.lvl.objectIndex].anchor.setTo(0.5, 0.5)
    this.lvl.objectP[this.lvl.objectIndex].body.setSize(16, 16, 0, 0)
    this.lvl.add.tween(this.lvl.objectP[this.lvl.objectIndex]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100, 1000, true)
    this.lvl.objectP.push(color)
    this.lvl.objectIndex += 2
  },

  render: function () {}
}
