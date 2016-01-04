LevelTutorial = function(g) {
	game = g;
    this.houseMap = null;
    this.layer = null;
    this.houseQuest = 0;

    ///////OBJECTS/////////
    this.hat = null; 
    this.rectangle = [];
    this.rectangleIndex = 0;
    this.lock = [];
    this.lockIndex = 0;
    this.door = [];
    this.doorIndex = 0;
    this.objectP = [];
    this.objectIndex = 0;
    //////////////////////

    //////TEXT////////////
    this.text = null;
    this.secondaryText = null;
    this.tutorialText = null;
    this.textLine = 1;
    this.textVelocity = 0.5; //higher the value slower the text
    this.tweenText = null;
    this.eraseTutorial = false;
    /////////////////////
};

LevelTutorial.prototype = {

	preload: function() {
        game.load.image('Pastel', 'assets/level/Pastel.png'); // loading the tileset image
        game.load.tilemap('homeMap', 'assets/level/homeTutorial.json', null, Phaser.Tilemap.TILED_JSON); // loading the tilemap file
	},

	create: function() {
		game.stage.backgroundColor = '#363636';
        game.camera.view = new Phaser.Rectangle(0, 0, 600, 640);
        game.world.setBounds(0, 0, 600, 640);
        game.physics.arcade.gravity.y = 0;

        this.houseMap = game.add.tilemap('homeMap'); // Preloaded tilemap
        this.houseMap.addTilesetImage('Pastel'); // Preloaded tileset

        this.layer = [
            this.houseMap.createLayer('background'),  //layer[0]
            this.houseMap.createLayer('walls'),       //layer[1]
            this.houseMap.createLayer('ObjectsWithCol'),  //layer[2]
        ];

        this.houseMap.setCollisionByExclusion([], true, this.layer[1]);
        this.houseMap.setCollisionByExclusion([], true, this.layer[2]);

        objectsConstructor.createObject(172,476,'yellow'); //hat 0
        objectsConstructor.createObject(476,108,'red'); //coffee 1
        objectsConstructor.createObject(60,244,'blue'); //bag 2

        objectsConstructor.createDoor(240,432); //doorRoom
        objectsConstructor.createLock(232,444); //doorRoom
        objectsConstructor.createDoor(112,176); //doorBathroom
        objectsConstructor.createLock(124,168); //doorBathroom
        objectsConstructor.createDoor(304,80); //out
       
        objectsConstructor.createRectangle(0,64,96,224); //smalRect 0
        objectsConstructor.createRectangle(96,64,544,352); //bigRect 1
        objectsConstructor.createRectangle(96,416,32,32);  //32Rect 2
        objectsConstructor.createRectangle(320,416,320,32); //theOtherRect 3  
        
    },

    textSequence: function(specific){ //historyPage = 1 
        if(specific == 'hat'){
            textWriter.printSecondaryText('Hat', 10, 0);
        }
        else if(specific == 'coffee'){
            textWriter.printSecondaryText('Coffee', 10, 0);
            
        }
        else if(specific == 'bag'){
            textWriter.printSecondaryText('Suitcase', 10, 0);
        }
        else{
            if(this.textLine == 1){
                textWriter.printHistory('...', 320, 602, 24, 100, levelTutorial);
            }
            else if(this.textLine == 2){
                textWriter.eraseText(1000, true); //delay for erase and true for change y
                textWriter.printHistory('I am late...', 320, 602, 24, 1000, levelTutorial);
            }
            else if(this.textLine == 3){
                textWriter.eraseText(1000, true);
                textWriter.printHistory('Better drink some coffee and get to work', 320, 602, 24, 1000, levelTutorial);
            }
            else if(this.textLine == 4){
                textWriter.printTutorial('Use WASD to slide and SPACE to interact', 320, 0, 24, 1000, levelTutorial);
                textWriter.eraseText(1000, false);
                this.textLine += 1;
                game.time.events.add(Phaser.Timer.SECOND * 2, function(){gameMananger.playerCanMove = true;}, this);
            }
            else if(this.textLine == 5){
                this.eraseTutorial = true;
                textWriter.printTutorial();
                textWriter.printHistory('I have to find time to clean this house...', 320, 602, 24, 1, levelTutorial);
            }
            else if(this.textLine == 6){
                textWriter.eraseText(1000, true);
                textWriter.printHistory('Now... coffee and my suitcase', 320, 602, 24, 1000, levelTutorial);         
            }
            else if(this.textLine == 7){
                textWriter.eraseText(1000, false);
                this.textLine += 1;
            }
            else if(this.textLine == 8){
                textWriter.printHistory('...', 320, 602, 24, 1, levelTutorial);           
            }
            else if(this.textLine == 9){
                textWriter.eraseText(1000, true);
                textWriter.printHistory('Lets go', 320, 602, 24, 1000, levelTutorial);
            }
            else if(this.textLine == 10){
                textWriter.eraseText(1000, false);
            }
        }

    },

    overlapObjects: function(player) {
        for (j = 0; j < this.lock.length; j++) { 
            if(game.physics.arcade.overlap(player, this.lock[j])){
                this.lock[j].destroy();
                this.door[j].destroy();
                if(this.door[j] == this.door[0]){
                    for(var i = 1; i<=3; i++){
                       var aux = game.add.tween(this.rectangle[i]).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, false); //black rectangle
                    }
                    game.add.tween(this.tutorialText).to( { y: -10 }, 1000, Phaser.Easing.Linear.None, true, 1000, false);
                    this.textSequence();
                }
                else if(this.door[j] == this.door[1]){
                    game.add.tween(this.rectangle[0]).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, false);
                }
            }
        }
        for (k = 0; k < this.objectP.length; k += 2) {
            if(game.physics.arcade.overlap(player, this.objectP[k])){
                this.objectP[k].destroy();
                if(this.objectP[k+1]=='yellow'){
                    player.loadTexture('playerWithHat');
                    this.textSequence('hat');
                }
                else if(this.objectP[k+1]=='blue'){
                    this.houseQuest ++;
                    this.textSequence('bag');
                    player.playerVelocity -= 50;
                }
                else if(this.objectP[k+1]=='red'){
                    this.houseQuest ++;
                    this.textSequence('coffee');
                    player.playerVelocity += 100;
                }
            }
        } 
    },

	update: function() {
        if(this.houseQuest == 2){
            this.houseQuest = 0;
            this.textSequence();
            objectsConstructor.createLock(296,92); //doorBathroom
        }

	},

    collide: function(object) {
        if(game.physics.arcade.collide(object, [this.layer[1], this.layer[2]])){
            player.playerMoving = false;
        }
    },

    render: function() {

    }
	
};