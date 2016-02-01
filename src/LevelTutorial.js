/* global Phaser, Player, ObjectsConstructor, TextWriter*/
var levelTutorial = function (game) {
  this.houseMap = null
  this.layer = null
  this.houseQuest = 0

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

levelTutorial.prototype = {

  create: function () {
    this.player = new Player(this.game, this)
    this.objConstructor = new ObjectsConstructor(this.game, this)
    this.textWriter = new TextWriter(this.game, this, this.player)

    this.game.stage.backgroundColor = '#363636'
    this.game.camera.view = new Phaser.Rectangle(0, 0, 600, 640)
    this.game.world.setBounds(0, 0, 600, 640)
    this.game.physics.arcade.gravity.y = 0

    this.houseMap = this.game.add.tilemap('homeMap') // Preloaded tilemap
    this.houseMap.addTilesetImage('Pastel') // Preloaded tileset

    this.layer = [
      this.houseMap.createLayer('background'),  // layer[0]
      this.houseMap.createLayer('walls'),       // layer[1]
      this.houseMap.createLayer('ObjectsWithCol') // layer[2]
    ]

    this.houseMap.setCollisionByExclusion([], true, this.layer[1])
    this.houseMap.setCollisionByExclusion([], true, this.layer[2])

    this.objConstructor.createObject(172, 476, 'yellow', 'hat') // hat 0
    this.objConstructor.createObject(476, 108, 'red', 'coffee') // coffee 1
    this.objConstructor.createObject(60, 244, 'blue', 'bag') // bag 2
    this.objConstructor.createObject(284, 300, 'yellow', 'whisky') // whisky 3

    this.objConstructor.createDoor(240, 432) // doorRoom
    this.objConstructor.createLock(232, 444) // doorRoom
    this.objConstructor.createDoor(112, 176) // doorBathroom
    this.objConstructor.createLock(124, 168) // doorBathroom
    this.objConstructor.createDoor(304, 80) // out

    this.objConstructor.createRectangle(0, 64, 96, 224) // smalRect 0
    this.objConstructor.createRectangle(96, 64, 544, 352) // bigRect 1
    this.objConstructor.createRectangle(96, 416, 32, 32)  // 32Rect 2
    this.objConstructor.createRectangle(320, 416, 320, 32) // theOtherRect 3

    this.player.create()

    this.textSequence()
  },

  textSequence: function (specific) { // historyPage = 1
    if (specific === 'hat') {
      this.textWriter.printSecondaryText('Hat', 10, 0)
    }
    else if (specific === 'coffee') {
      this.textWriter.printSecondaryText('Coffee', 10, 0)
    }
    else if (specific === 'bag') {
      this.textWriter.printSecondaryText('Suitcase', 10, 0)
    }
    else if (specific === 'whisky') {
      this.textWriter.printSecondaryText('Whisky', 10, 0)
    }
    else {
      if (this.textWriter.textLine === 1) {
        this.textWriter.printHistory('...', 320, 628, 24, 100, levelTutorial)
      }
      else if (this.textWriter.textLine === 2) {
        this.textWriter.eraseText(1000, true) // delay for erase and true for change y
        this.textWriter.printHistory('I am late...', 320, 628, 24, 1000, levelTutorial)
      }
      else if (this.textWriter.textLine === 3) {
        this.textWriter.eraseText(1000, true)
        this.textWriter.printHistory('Better drink some coffee and get to work', 320, 628, 24, 1000, levelTutorial)
      }
      else if (this.textWriter.textLine === 4) {
        this.textWriter.printTutorial('Use WASD to slide and SPACE to interact', 320, 0, 24, 1000, levelTutorial)
        this.textWriter.eraseText(1000, false)
        this.textWriter.textLine += 1
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function () { this.player.playerCanMove = true }, this)
      }
      else if (this.textWriter.textLine === 5) {
        this.textWriter.eraseTutorial = true
        this.textWriter.printTutorial()
        this.textWriter.printHistory('I have to find time to clean this house...', 320, 628, 24, 1, levelTutorial)
      }
      else if (this.textWriter.textLine === 6) {
        this.textWriter.eraseText(1000, true)
        this.textWriter.printHistory('Now... coffee and my suitcase', 320, 628, 24, 1000, levelTutorial)
      }
      else if (this.textWriter.textLine === 7) {
        this.textWriter.eraseText(1000, false)
        this.textWriter.textLine += 1
      }
      else if (this.textWriter.textLine === 8) {
        this.textWriter.printHistory('...', 320, 628, 24, 1, levelTutorial)
      }
      else if (this.textWriter.textLine === 9) {
        this.textWriter.eraseText(1000, true)
        this.textWriter.printHistory('Lets go', 320, 628, 24, 1000, levelTutorial)
      }
      else if (this.textWriter.textLine === 10) {
        this.textWriter.eraseText(1000, false)
      }
    }
  },

  overlapObjects: function (player) {
    for (var j = 0; j < this.lock.length; j++) {
      if (this.game.physics.arcade.overlap(player, this.lock[j])) {
        this.lock[j].destroy()
        this.door[j].destroy()
        if (this.door[j] === this.door[0]) {
          for (var i = 1; i <= 3; i++) {
            this.game.add.tween(this.rectangle[i]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0) // black rectangle
          }
          this.game.add.tween(this.textWriter.tutorialText).to({ y: -10 }, 1000, Phaser.Easing.Linear.None, true, 1000)
          this.textSequence()
        }
        else if (this.door[j] === this.door[1]) {
          this.game.add.tween(this.rectangle[0]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0)
        }
      }
    }
    for (var k = 0; k < this.objectP.length; k += 2) {
      if (this.game.physics.arcade.overlap(player, this.objectP[k])) {
        this.objectP[k].destroy()
        var object = this.objectP[k + 1]
        if (object === 'hat') {
          player.loadTexture('playerWithHat')
          this.textSequence(object)
        }
        else if (object === 'bag') {
          this.houseQuest ++
          this.textSequence(object)
          player.playerVelocity -= 50
        }
        else if (object === 'coffee') {
          this.houseQuest ++
          this.textSequence(object)
          player.playerVelocity += 100
        }
        else if (object === 'whisky') {
          this.textSequence(object)
        }
      }
    }
  },

  update: function () {
    this.player.update()
    if (this.houseQuest === 2) {
      this.houseQuest = 0
      this.textSequence()
      this.objConstructor.createLock(296, 92) // doorBathroom
    }
  },

  collide: function (object) {
    if (this.game.physics.arcade.collide(object, [this.layer[1], this.layer[2]])) {
      this.player.playerMoving = false
    }
  },

  render: function () {}
}
