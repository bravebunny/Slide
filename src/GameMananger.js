GameMananger = function(g) {

	game = g;
	levelTutorial = null;
	player = null;
	textWriter = null;
	objectsConstructor  = null;
	cursors = null;
	this.playerCanMove = false;
};

GameMananger.prototype = {

	preload: function() {
    	levelTutorial = new LevelTutorial(game);
		levelTutorial.preload();

		player = new Player(game);
		player.preload();

		objectsConstructor = new ObjectsConstructor(game);
		objectsConstructor.preload(); 

		textWriter = new TextWriter(game);

	},

	create: function() {
		levelTutorial.create();
		player.create();

		levelTutorial.textSequence();
	},

	update: function() {
		if(this.playerCanMove){
			player.update();
			levelTutorial.update();

			if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
	            player.moveLeft();
	        } 
	        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
	            player.moveRight();
	        }

	        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
	            player.moveUp();
	        }
	        else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
	            player.moveDown();
	        }

	        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	            player.interact();
	        }
    	}
	},

	render: function(){
		player.render();
		objectsConstructor.render();
	}
};