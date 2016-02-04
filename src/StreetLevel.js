/* global Phaser, Player, ObjectsConstructor, TextWriter, localStorage*/
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

  this.auxLocker = true
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

    this.objConstructor.createDoor(3, 6) // secondBuildingDoor
    this.objConstructor.createLock(3, 6, 0, '2b') // secondBuildingDoor
    this.objConstructor.createDoor(8, 13) // firstBuildingDoor
    this.objConstructor.createDoor(19, 3) // out1
    this.objConstructor.createDoor(8, 3) // secondBuildingDoor
    // this.objConstructor.createLock(8, 3, 1) // secondBuildingDoor
    this.objConstructor.createDoor(13, 1) // out2
    this.objConstructor.createDoor(10, 18) // gardenDoor

    this.objConstructor.createObject(1, 9, 1, 'yellow', 'sweet') // sardine
    this.objConstructor.createObject(19, 3, 3, 'blue', 'girl') // girl

    this.objConstructor.createRectangle(0, 8, 2, 11) // 1Building
    this.objConstructor.createRectangle(2, 9, 6, 11) // 1Building
    this.objConstructor.createRectangle(0, 0, 9, 1) // 2Building
    this.objConstructor.createRectangle(0, 0, 8, 6) // 2Building
    this.objConstructor.createRectangle(0, 6, 2, 1) // 2Building

    this.player.create()
    this.player.setPosition(10, 17)
    // this.player.playerCanMove = true

    /*this.textWriter.addText('Hum... No birds singing today', 300)
    this.textWriter.addText('Maybe I can go get a rose for Maggie')
    this.textWriter.addText('But first i need my scissor')
    this.textWriter.printHistory()

    this.game.time.events.add(Phaser.Timer.SECOND * 7, function () { this.player.playerCanMove = true }, this)*/
  },

  overlapObjects: function (player) {
    for (var j = 0; j < this.lock.length; j++) {
      if (this.game.physics.arcade.overlap(player, this.lock[j])) {
        if (this.lock[j].name === '1b') {
          for (var i = 0; i < 2; i++) {
            this.game.add.tween(this.rectangle[i]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0) // black rectangle
          }
        } else if (this.lock[j].name === '2b') {
          if (localStorage.getItem('key') === 'true') {
            for (var l = 2; l < 5; l++) {
              this.game.add.tween(this.rectangle[l]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0) // black rectangle
            }
          } else if (this.auxLocker) {
            this.auxLocker = false
            this.textWriter.printSecondaryText('Locked')
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function () { this.auxLocker = true }, this)
          }
        } else if (this.lock[j].name === 'out1') {
          this.textWriter.addText('Bye', 100)
          this.textWriter.printHistory()
        }
        if (this.lock[j].name === '2b' && localStorage.getItem('key') !== 'true') {
        } else {
          this.lock[j].destroy()
          this.door[j].destroy()
        }
      }
    }
    for (var k = 0; k < this.objectP.length; k++) {
      if (this.game.physics.arcade.overlap(player, this.objectP[k])) {
        var object = this.objectP[k].name
        if (object === 'sweet') {
          this.textWriter.printSecondaryText('Sardine')
          this.textWriter.addText('Poor girl..', 100)
          this.textWriter.printHistory()
          this.quest ++
        } else if (object === 'girl') {
          this.textWriter.printSecondaryText('Hunger')
          this.textWriter.addText("I don't have anything for you to eat", 100)
          this.textWriter.addText('Ok.. I will try to find you something')
          this.textWriter.printHistory()
          this.objConstructor.createLock(8, 13, 1, '1b') // firstBuildingDoor
        }
        this.objectP[k].destroy()
      }
    }
  },

  update: function () {
    this.player.update()
    if (this.quest === 1) {
      this.quest = 0
      this.objConstructor.createLock(19, 3, 3, 'out1') // doorOut
    }
  },

  render: function () {}
}
