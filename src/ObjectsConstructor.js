/* global Phaser */
var ObjectsConstructor = function (game, level) {
  this.game = game
  this.lvl = level

  this.rectangleIndex = 0
  this.lockIndex = 0
  this.doorIndex = 0
  this.objectIndex = 0
}

ObjectsConstructor.prototype = {

  createLock: function (x, y) {
    this.lvl.lock.push(this.lvl.add.sprite(x, y, 'lock'))
    this.lvl.physics.arcade.enable(this.lvl.lock[this.lockIndex])
    this.lvl.lock[this.lockIndex].anchor.setTo(0.5, 0.5)
    this.lvl.lock[this.lockIndex].body.setSize(16, 16, 0, 0)
    this.lvl.add.tween(this.lvl.lock[this.lockIndex]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100, 1000, true)
    this.lockIndex ++
  },

  createDoor: function (x, y) {
    this.lvl.door.push(this.lvl.add.sprite(x, y, 'door'))
    this.lvl.physics.arcade.enable(this.lvl.door[this.doorIndex])
    this.lvl.door[this.doorIndex].anchor.setTo(0.5, 0.5)
    this.lvl.door[this.doorIndex].body.immovable = true
    this.lvl.door[this.doorIndex].body.moves = false
    this.doorIndex ++
  },

  createRectangle: function (x, y, width, height) {
    this.lvl.rectangle.push(this.lvl.add.graphics(0, 0))
    this.lvl.rectangle[this.rectangleIndex].beginFill(0x363636)
    this.lvl.rectangle[this.rectangleIndex].drawRect(x, y, width, height)
    this.rectangleIndex ++
  },

  createObject: function (x, y, color) {
    this.lvl.objectP.push(this.lvl.add.sprite(x, y, color))
    this.lvl.physics.arcade.enable(this.lvl.objectP[this.objectIndex])
    this.lvl.objectP[this.objectIndex].anchor.setTo(0.5, 0.5)
    this.lvl.objectP[this.objectIndex].body.setSize(16, 16, 0, 0)
    this.lvl.add.tween(this.lvl.objectP[this.objectIndex]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100, 1000, true)
    this.lvl.objectP.push(color)
    this.objectIndex += 2
  },

  render: function () {}
}
