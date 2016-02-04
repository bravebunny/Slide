/* global Phaser, Player, ObjectsConstructor, TextWriter*/
var hospiceLevel = function (game) {
  this.houseMap = null
  this.layer = null
  this.quest = 0

  this.player = null
  this.objConstructor = null
  this.textWriter = null

  // /////OBJECTS/////////
  this.rectangle = []
  this.lock = []
  this.door = []
  this.objectP = []
  // ////////////////////

  this.auxLocker = true
  this.auxOneFinal = true
  this.auxOneTime = true
}

hospiceLevel.prototype = {

  create: function () {
    this.player = new Player(this.game, this)
    this.objConstructor = new ObjectsConstructor(this.game, this)
    this.textWriter = new TextWriter(this.game, this, this.player)

    this.game.stage.backgroundColor = '#363636'
    this.game.physics.arcade.gravity.y = 0

    this.houseMap = this.game.add.tilemap('hospiceMap') // Preloaded tilemap
    this.houseMap.addTilesetImage('Pastel') // Preloaded tileset

    this.layer = [
      this.houseMap.createLayer('background'),  // layer[0]
      this.houseMap.createLayer('ObjectsWithCol') // layer[2]
    ]

    this.houseMap.setCollisionByExclusion([], true, this.layer[1])
    this.houseMap.setCollisionByExclusion([], true, this.layer[2])

    this.objConstructor.createObject(6, 12, 1, 'blue', 'pills') // scissor
    this.objConstructor.createObject(12, 7, 0, 'red', 'meds') // scissor

    this.objConstructor.createDoor(8, 6) // warehouseDoor
    this.objConstructor.createLock(8, 6, 0) // warehouseDoor

    this.player.create()
    this.player.setPosition(13, 14)
    // this.player.playerCanMove = true

    /* this.textWriter.addText('Hum... No birds singing today', 300)
    this.textWriter.addText('Maybe I can go get a rose for Maggie')
    this.textWriter.addText('But first i need my scissor')
    this.textWriter.printHistory()

    this.game.time.events.add(Phaser.Timer.SECOND * 7, function () { this.player.playerCanMove = true }, this)*/

    this.textWriter.printTutorial('Use WASD to slide and SPACE to interact', 320, 0, 24, 1000)
  },

  textSequence: function (specific) {
    if (specific === 'scissor') {
      this.textWriter.printSecondaryText('Scissor')
    } else if (specific === 'rose') {
      this.textWriter.printSecondaryText('Rose')
    } else if (specific === 'mud') {
      this.textWriter.addText("The soil it's all tilled", 100)
      this.textWriter.addText("Strange.. I don't remember digging here")
      this.textWriter.printHistory()
    } else {
      this.textWriter.printHistory()
    }
  },

  overlapObjects: function (player) {
    for (var j = 0; j < this.lock.length; j++) {
      if (this.game.physics.arcade.overlap(player, this.lock[j])) {
        if (this.auxLocker) {
          this.auxLocker = false
          this.textWriter.printSecondaryText('Locked')
          this.game.time.events.add(Phaser.Timer.SECOND * 1, function () { this.auxLocker = true }, this)
        }
        if (this.auxOneTime) {
          this.textWriter.addText('Why is the door locked?!!', 100)
          this.textSequence()
          this.auxOneTime = false
          this.quest++
        }
      }
    }
    for (var k = 0; k < this.objectP.length; k++) {
      if (this.game.physics.arcade.overlap(player, this.objectP[k])) {
        var object = this.objectP[k].name
        if (object === 'pills') {
          this.textWriter.printSecondaryText('Pills')
          this.textWriter.addText('Pills? Where am i?', 100)
          this.textSequence()
          this.quest++
        } else if (object === 'meds') {
          this.textWriter.printSecondaryText('Meds')
          this.textWriter.addText("What's going on?", 100)
          this.textSequence()
          this.quest++
        }
        this.objectP[k].destroy()
      }
    }
  },

  update: function () {
    this.player.update()
    if (this.quest === 3 && this.auxOneFinal) {
      this.auxOneFinal = false
      this.textWriter.addText('I need to get out of here', 100)
      this.textWriter.addText('Sarah?!', 100)
      this.textSequence()
      this.game.time.events.add(Phaser.Timer.SECOND * 5, function () { this.game.state.start('GameMananger', true, false, 1) }, this)
    }
  },

  render: function () {}
}
