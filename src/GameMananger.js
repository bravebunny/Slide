/* global Phaser */
var gameMananger = function (game) {
  this.chapterNumber = 1
  this.level = ''
}

gameMananger.prototype = {

  init: function (chapter) {
    if (chapter) this.chapterNumber = chapter
  },

  create: function () {
    this.game.stage.backgroundColor = '#363636'
    var textChapter = this.game.add.text(320, 192, 'Chapter ' + this.chapterNumber, {font: '' + 60 + 'pt Fixedsys', fill: '#ffffff', align: 'center'})
    textChapter.anchor.setTo(0.5, 0.5)
    textChapter.alpha = 0
    var tween = this.game.add.tween(textChapter).to({ alpha: 1 }, 2500, Phaser.Easing.Linear.None, true, 1000)
    tween.onComplete.add(function () {
      this.game.add.tween(textChapter).to({ alpha: 0 }, 2500, Phaser.Easing.Linear.None, true, 2000)
    }, this)

    switch (this.chapterNumber) {
      case 1:
        this.level = 'Home'
        break
      case 2:
        this.level = 'Backwyard'
        break
    }

    var text = this.game.add.text(320, 384, this.level, {font: '' + 60 + 'pt Fixedsys', fill: '#ffffff', align: 'center'})
    text.anchor.setTo(0.5, 0.5)
    text.alpha = 0
    this.game.add.tween(text).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 3000, 0, true)
    /**/
    this.game.time.events.add(Phaser.Timer.SECOND * 10, function () {
      switch (this.chapterNumber) {
        case 1:
          this.game.state.start('HouseLevel', true, false)
          break
        case 2:
          this.game.state.start('GardenLevel', true, false)
          break
      }
    }, this)
    /** /
    this.game.state.start('GardenLevel', true, false)
    /**/
  }

}
