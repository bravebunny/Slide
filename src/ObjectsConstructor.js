ObjectsConstructor = function(g) {
	game = g;
};

ObjectsConstructor.prototype = {

	preload: function() {
        game.load.image('yellow', 'assets/sprites/yellow.png'); // loading the tileset image
        game.load.image('blue', 'assets/sprites/blue.png');
        game.load.image('lightGreen', 'assets/sprites/lightGreen.png');
        game.load.image('red', 'assets/sprites/red.png');
        game.load.image('door', 'assets/sprites/door.png');
        game.load.image('lock', 'assets/sprites/lock.png');
        game.load.image('playerWithHat', 'assets/sprites/playerWithHat.png');
	},

	createLock: function(x,y) {
        levelTutorial.lock.push(game.add.sprite(x, y, 'lock'));
        game.physics.arcade.enable(levelTutorial.lock[levelTutorial.lockIndex]);
        levelTutorial.lock[levelTutorial.lockIndex].anchor.setTo(.5,.5);
        levelTutorial.lock[levelTutorial.lockIndex].body.setSize(16, 16, 0, 0);
        game.add.tween(levelTutorial.lock[levelTutorial.lockIndex]).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100, 1000, true);
        levelTutorial.lockIndex ++;
    },

    createDoor: function(x,y) {
        levelTutorial.door.push(game.add.sprite(x, y, 'door'));
        game.physics.arcade.enable(levelTutorial.door[levelTutorial.doorIndex]);
        levelTutorial.door[levelTutorial.doorIndex].anchor.setTo(.5,.5);
        levelTutorial.door[levelTutorial.doorIndex].body.immovable = true;
        levelTutorial.door[levelTutorial.doorIndex].body.moves = false;
        levelTutorial.doorIndex ++;
    },

    createRectangle: function(x,y,width,height){
        levelTutorial.rectangle.push(game.add.graphics(0, 0));
        levelTutorial.rectangle[levelTutorial.rectangleIndex].beginFill(0x363636);
        levelTutorial.rectangle[levelTutorial.rectangleIndex].drawRect(x, y, width, height);
        levelTutorial.rectangleIndex ++;
    },

    createObject: function(x,y,color){
        levelTutorial.objectP.push(game.add.sprite(x, y, color));
        game.physics.arcade.enable(levelTutorial.objectP[levelTutorial.objectIndex]);
        levelTutorial.objectP[levelTutorial.objectIndex].anchor.setTo(.5,.5);
        levelTutorial.objectP[levelTutorial.objectIndex].body.setSize(16, 16, 0, 0);
        game.add.tween(levelTutorial.objectP[levelTutorial.objectIndex]).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100, 1000, true);
        levelTutorial.objectP.push(color);
        levelTutorial.objectIndex +=2;
    },

    render: function() {
        
    }
	
};