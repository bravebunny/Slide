/* global Phaser*/
var boot = function (game) {}

boot.prototype = {

  preload: function () {
    this.game.load.image('loading', 'assets/sprites/menu/loading.png')
  },

  create: function () {
    this.game.renderer.roundPixels = true
    this.game.stage.smoothed = false
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.refresh()
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 1000

    this.state.start('PreloadGame')
  }
}
