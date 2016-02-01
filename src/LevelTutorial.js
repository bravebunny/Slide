/* global Phaser, Player, ObjectsConstructor, TextWriter*/
var levelTutorial = function (game) {
  this.houseMap = null
  this.layer = null
  this.houseQuest = 0

  // /////OBJECTS/////////
  this.hat = null
  this.rectangle = []
  this.rectangleIndex = 0
  this.lock = []
  this.lockIndex = 0
  this.door = []
  this.doorIndex = 0
  this.objectP = []
  this.objectIndex = 0
  // ////////////////////

  // ////TEXT////////////
  this.text = null
  this.secondaryText = null
  this.tutorialText = null
  this.textLine = 1
  this.textVelocity = 0.5 // higher the value slower the text
  this.tweenText = null
  this.eraseTutorial = false
  // ///////////////////

  this.player = null
  this.objectsConstructor = null
  this.textWriter = null
}

levelTutorial.prototype = {

  create: function () {
    this.player = new Player(this.game, this)
    this.objectsConstructor = new ObjectsConstructor(this.game, this)
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

    this.objectsConstructor.createObject(172, 476, 'yellow') // hat 0
    this.objectsConstructor.createObject(476, 108, 'red') // coffee 1
    this.objectsConstructor.createObject(60, 244, 'blue') // bag 2

    this.objectsConstructor.createDoor(240, 432) // doorRoom
    this.objectsConstructor.createLock(232, 444) // doorRoom
    this.objectsConstructor.createDoor(112, 176) // doorBathroom
    this.objectsConstructor.createLock(124, 168) // doorBathroom
    this.objectsConstructor.createDoor(304, 80) // out

    this.objectsConstructor.createRectangle(0, 64, 96, 224) // smalRect 0
    this.objectsConstructor.createRectangle(96, 64, 544, 352) // bigRect 1
    this.objectsConstructor.createRectangle(96, 416, 32, 32)  // 32Rect 2
    this.objectsConstructor.createRectangle(320, 416, 320, 32) // theOtherRect 3

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
    else {
      if (this.textLine === 1) {
        this.textWriter.printHistory('...', 320, 602, 24, 100, levelTutorial)
      }
      else if (this.textLine === 2) {
        this.textWriter.eraseText(1000, true) // delay for erase and true for change y
        this.textWriter.printHistory('I am late...', 320, 602, 24, 1000, levelTutorial)
      }
      else if (this.textLine === 3) {
        this.textWriter.eraseText(1000, true)
        this.textWriter.printHistory('Better drink some coffee and get to work', 320, 602, 24, 1000, levelTutorial)
      }
      else if (this.textLine === 4) {
        this.textWriter.printTutorial('Use WASD to slide and SPACE to interact', 320, 0, 24, 1000, levelTutorial)
        this.textWriter.eraseText(1000, false)
        this.textLine += 1
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function () { this.player.playerCanMove = true }, this)
      }
      else if (this.textLine === 5) {
        this.eraseTutorial = true
        this.textWriter.printTutorial()
        this.textWriter.printHistory('I have to find time to clean this house...', 320, 602, 24, 1, levelTutorial)
      }
      else if (this.textLine === 6) {
        this.textWriter.eraseText(1000, true)
        this.textWriter.printHistory('Now... coffee and my suitcase', 320, 602, 24, 1000, levelTutorial)       
      }
      else if (this.textLine === 7) {
        this.textWriter.eraseText(1000, false)
        this.textLine += 1
      }
      else if (this.textLine === 8) {
        this.textWriter.printHistory('...', 320, 602, 24, 1, levelTutorial)         
      }
      else if (this.textLine === 9) {
        this.textWriter.eraseText(1000, true)
        this.textWriter.printHistory('Lets go', 320, 602, 24, 1000, levelTutorial)
      }
      else if (this.textLine === 10) {
        this.textWriter.eraseText(1000, false)
      }
    }
  },

  overlapObjects: function(player) {
    for (var j = 0; j < this.lock.length; j++) {
      if (this.game.physics.arcade.overlap(player, this.lock[j])) {
        this.lock[j].destroy()
        this.door[j].destroy()
        if (this.door[j] === this.door[0]) {
          for (var i = 1; i <= 3; i++) {
            this.game.add.tween(this.rectangle[i]).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0) // black rectangle
          }
          this.game.add.tween(this.tutorialText).to({ y: -10 }, 1000, Phaser.Easing.Linear.None, true, 1000)
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
        if (this.objectP[k + 1] ==='yellow') {
          player.loadTexture('playerWithHat')
          this.textSequence('hat')
        }
        else if (this.objectP[k + 1] ==='blue') {
          this.houseQuest ++
          this.textSequence('bag')
          player.playerVelocity -= 50
        }
        else if (this.objectP[k + 1] ==='red') {
          this.houseQuest ++
          this.textSequence('coffee')
          player.playerVelocity += 100
        }
      }
    }
  },

  update: function () {
    this.player.update()
    if (this.houseQuest === 2) {
      this.houseQuest = 0
      this.textSequence()
      this.objectsConstructor.createLock(296, 92) // doorBathroom
    }
  },

  collide: function (object) {
    if (this.game.physics.arcade.collide(object, [this.layer[1], this.layer[2]])) {
      this.player.playerMoving = false
    }
  },

  render: function () {}
}
