/* global Phaser*/
var TextWriter = function (game, level, player) {
  this.lvl = level
  this.player = player
  this.game = game

  // /////TEXT///// //
  this.textVelocity = 2.0 // higher the value slower the text
  this.tweenText = null
  this.textLine = 1
  this.eraseTutorial = false
  this.tutorialText = null
}

TextWriter.prototype = {

  printHistory: function (text, x, y, size, delay, levelNumb) {
    this.lvl.text = this.game.add.text(x, y, text, {font: '' + size + 'pt Fixedsys', fill: '#363636', align: 'center'})
    this.lvl.text.alpha = 0
    this.lvl.text.anchor.setTo(0.5, 0.5)
    this.tweenText = this.game.add.tween(this.lvl.text).to({y: 670}, 700 * this.textVelocity, Phaser.Easing.Out, true, delay * this.lvl.textVelocity)
    this.tweenText = this.game.add.tween(this.lvl.text).to({ alpha: 1 }, 1000 * this.textVelocity, Phaser.Easing.Linear.None, true, delay * this.lvl.textVelocity)
    this.textLine += 1
    this.tweenText.onComplete.add(this.lvl.textSequence, this.lvl)
  },

  printSecondaryText: function (text, size, delay) {
    this.lvl.secondaryText = this.game.add.text(this.player.spriteMain.x, this.player.spriteMain.y, text, {font: '' + size + 'pt Fixedsys', fill: '#ffffff', align: 'center'})
    this.lvl.secondaryText.alpha = 1
    this.lvl.secondaryText.anchor.setTo(0.5, 0.5)
    this.game.add.tween(this.lvl.secondaryText).to({y: this.player.spriteMain.y - 100}, 1000, Phaser.Easing.Out, true, delay)
    this.game.add.tween(this.lvl.secondaryText.scale).to({x: 2, y: 2}, 1000, Phaser.Easing.Linear.None, true, delay)
    this.game.add.tween(this.lvl.secondaryText).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, delay)
  },

  printTutorial: function (text, x, y, size, delay) {
    if (this.eraseTutorial) {
      this.game.add.tween(this.tutorialText).to({y: -10}, 800, Phaser.Easing.Out, true, delay)
      this.game.add.tween(this.tutorialText).to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true, delay)
    }
		else {
      this.tutorialText = this.game.add.text(x, y, text, {font: '' + size + 'pt Fixedsys', fill: '#ffffff', align: 'center'})
      this.tutorialText.alpha = 0
      this.tutorialText.anchor.setTo(0.5, 0.5)
      this.game.add.tween(this.tutorialText).to({y: 80}, 800, Phaser.Easing.Out, true, delay)
      this.game.add.tween(this.tutorialText).to({ alpha: 1 }, 800, Phaser.Easing.Linear.None, true, delay)
    }
  },

  eraseText: function (delay, changeY) {
    if (this.tweenText) {
      if (changeY) {
        this.tweenText = this.game.add.tween(this.lvl.text).to({ alpha: 0 }, 1600 * this.textVelocity, Phaser.Easing.Linear.None, true, 2.8 * delay * this.lvl.textVelocity)
        this.tweenText = this.game.add.tween(this.lvl.text).to({ y: 712 }, 800 * this.textVelocity, Phaser.Easing.Linear.None, true, delay * this.lvl.textVelocity)
      }
			else {
        this.tweenText = this.game.add.tween(this.lvl.text).to({ alpha: 0 }, 1600 * this.textVelocity, Phaser.Easing.Linear.None, true, 2 * delay * this.lvl.textVelocity)
      }
    }
  }
}
