/* global Phaser*/
var TextWriter = function (game, level, player) {
  this.lvl = level
  this.player = player
  this.game = game

  // /////TEXT///// //
  this.text = null
  this.textArray = []
  this.tweenText = null
  this.eraseTutorial = false
  this.tutorialText = null
  this.tween = null

  this.x = 320
  this.y = 628
  this.size = 24
  this.textVelocity = 1.2 // higher the value slower the text
  this.delay = 1000

  this.nextTextLine = false
  this.numberOfLines = 0
  this.printing = false
}

TextWriter.prototype = {

  addText: function (text) {
    this.text = this.game.add.text(this.x, this.y, text, {font: '' + this.size + 'pt Fixedsys', fill: '#363636', align: 'center'})
    this.text.alpha = 0
    this.text.anchor.setTo(0.5, 0.5)

    this.textArray.push(this.text)
    this.numberOfLines ++
  },

  printHistory: function () {
    if (!this.printing) {
      this.printing = true
      this.game.add.tween(this.textArray[0]).to({y: 670}, 700 * this.textVelocity, Phaser.Easing.Out, true, this.delay * this.textVelocity)
      this.tween = this.game.add.tween(this.textArray[0]).to({ alpha: 1 }, 1000 * this.textVelocity, Phaser.Easing.Linear.None, true, this.delay * this.textVelocity)
      this.tween.onComplete.add(function () {
        this.game.add.tween(this.textArray[0]).to({ alpha: 0 }, 1000 * this.textVelocity, Phaser.Easing.Linear.None, true, 2.8 * this.delay * this.textVelocity)
        this.game.add.tween(this.textArray[0]).to({ y: 712 }, 800 * this.textVelocity, Phaser.Easing.Linear.None, true, this.delay * this.textVelocity)
        if (this.textArray.length !== 1) {
          this.textArray.shift()
          this.printing = false
          this.printHistory()
        } else {
          this.printing = false
          this.textArray = []
        }
      }, this)
    }
  },

  printSecondaryText: function (text) {
    this.lvl.secondaryText = this.game.add.text(this.player.spriteMain.x, this.player.spriteMain.y, text, {font: '' + 10 + 'pt Fixedsys', fill: '#ffffff', align: 'center'})
    this.lvl.secondaryText.alpha = 1
    this.lvl.secondaryText.anchor.setTo(0.5, 0.5)
    this.game.add.tween(this.lvl.secondaryText).to({y: this.player.spriteMain.y - 100}, 1000, Phaser.Easing.Out, true, 0)
    this.game.add.tween(this.lvl.secondaryText.scale).to({x: 2, y: 2}, 1000, Phaser.Easing.Linear.None, true, 0)
    this.game.add.tween(this.lvl.secondaryText).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, 0)
  },

  printTutorial: function (text, x, y, size, delay) {
    if (this.eraseTutorial) {
      this.game.add.tween(this.tutorialText).to({y: -10}, 800, Phaser.Easing.Out, true, delay)
      this.game.add.tween(this.tutorialText).to({ alpha: 0 }, 800, Phaser.Easing.Linear.None, true, delay)
    } else {
      this.tutorialText = this.game.add.text(x, y, text, {font: '' + size + 'pt Fixedsys', fill: '#ffffff', align: 'center'})
      this.tutorialText.alpha = 0
      this.tutorialText.anchor.setTo(0.5, 0.5)
      this.game.add.tween(this.tutorialText).to({y: 80}, 800, Phaser.Easing.Out, true, delay)
      this.game.add.tween(this.tutorialText).to({ alpha: 1 }, 800, Phaser.Easing.Linear.None, true, delay)
    }
  }
}
