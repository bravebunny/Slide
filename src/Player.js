/* global Phaser */
var Player = function (game, level) {
  this.game = game
  this.lvl = level
  this.spriteMain = null
  this.playerMoving = false
  this.blocked = false
  this.playerVelocity = 200
  this.playerCanMove = true
}

Player.prototype = {

  create: function () {
    this.spriteMain = this.game.add.sprite(0, 0, 'spriteMain')
    this.game.physics.enable(this.spriteMain, Phaser.Physics.ARCADE)
    this.spriteMain.anchor.setTo(0.5, 0.5)
    this.spriteMain.body.collideWorldBounds = true
	},

  setPosition: function (x, y) {
    this.spriteMain.x = (x + 1) * 32 - 16
    this.spriteMain.y = (y + 1) * 32 - 16
  },

  update: function () {
    if (this.playerCanMove) {
      this.collide()

      if (this.game.physics.arcade.collide(this.lvl.door, this.spriteMain)) {
        this.playerMoving = false
      }

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.moveLeft()
      } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        this.moveRight()
      }

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        this.moveUp()
      } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        this.moveDown()
      }

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.interact()
      }
    }
  },

  moveLeft: function () {
    if (!this.playerMoving) {
      this.playerMoving = true
      this.spriteMain.body.velocity.x = -this.playerVelocity
    }
  },

  moveRight: function () {
    if (!this.playerMoving) {
      this.playerMoving = true
      this.spriteMain.body.velocity.x = this.playerVelocity
    }
  },

  moveUp: function () {
    if (!this.playerMoving) {
      this.playerMoving = true
      this.spriteMain.body.velocity.y = -this.playerVelocity
    }
  },

  moveDown: function () {
    if (!this.playerMoving) {
      this.playerMoving = true
      this.spriteMain.body.velocity.y = this.playerVelocity
    }
  },

  interact: function () {
    this.lvl.overlapObjects(this.spriteMain)
  },

  collide: function () {
    if (this.game.physics.arcade.collide(this.spriteMain, [this.lvl.layer[1], this.lvl.layer[2]])) {
      this.playerMoving = false
    }
  },

  render: function (info) {}
}
