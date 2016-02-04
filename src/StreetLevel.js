/* global Phaser, Player, ObjectsConstructor, TextWriter*/
var streetLevel = function (game) {
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

  this.hat = null
  this.whisky = null
  // ////////////////////
}

streetLevel.prototype = {

  create: function () {
    this.player = new Player(this.game, this)
    this.objConstructor = new ObjectsConstructor(this.game, this)
    this.textWriter = new TextWriter(this.game, this, this.player)

    this.game.stage.backgroundColor = '#363636'
    this.game.physics.arcade.gravity.y = 0

    this.houseMap = this.game.add.tilemap('streetMap') // Preloaded tilemap
    this.houseMap.addTilesetImage('Pastel') // Preloaded tileset

    this.layer = [
      this.houseMap.createLayer('background'),  // layer[0]
      this.houseMap.createLayer('ObjectsWithCol') // layer[2]
    ]

    this.houseMap.setCollisionByExclusion([], true, this.layer[1])
    this.houseMap.setCollisionByExclusion([], true, this.layer[2])

    /*this.objConstructor.createObject(2, 17, 2, 'blue', 'scissor') // scissor
    this.objConstructor.createObject(4, 8, 0, 'red', 'mud') // scissor

    this.objConstructor.createDoor(6, 15) // warehouseDoor
    this.objConstructor.createLock(6, 15, 1, 'warehouse') // warehouseDoor
    this.objConstructor.createDoor(10, 4) // out
    this.objConstructor.createDoor(14, 18) // houseDoor

    this.objConstructor.createRectangle(32, 448, 160, 160)
    */
    this.player.create()
    this.player.setPosition(10, 17)
    // this.player.playerCanMove = true

    /*this.textWriter.addText('Hum... No birds singing today', 300)
    this.textWriter.addText('Maybe I can go get a rose for Maggie')
    this.textWriter.addText('But first i need my scissor')
    this.textWriter.printHistory()

    this.game.time.events.add(Phaser.Timer.SECOND * 7, function () { this.player.playerCanMove = true }, this)*/
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
        if (this.lock[j].name === 'warehouse') {
          for (var i = 0; i < this.rectangle.length; i++) {
            this.game.add.tween(this.rectangle[i]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0) // black rectangle
          }
        }
        this.lock[j].destroy()
        this.door[j].destroy()
      }
    }
    for (var k = 0; k < this.objectP.length; k++) {
      if (this.game.physics.arcade.overlap(player, this.objectP[k])) {
        var object = this.objectP[k].name
        if (object === 'scissor') {
          this.objConstructor.createObject(15, 9, 3, 'blue', 'rose')
        } else if (object === 'rose') {
          this.quest ++
        }
        this.textSequence(object)
        this.objectP[k].destroy()
      }
    }
  },

  update: function () {
    this.player.update()
    if (this.quest === 1) {
      this.quest = 0
      this.textWriter.addText('Lets move on', 100)
      this.textSequence()
      this.objConstructor.createLock(10, 4, 0) // doorOut
    }
  },

  render: function () {}
}
