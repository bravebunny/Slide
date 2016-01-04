Player = function(g) {
	game = g;
	this.spriteMain = null;
    this.playerMoving = false;
    this.blocked = false;
    this.playerVelocity = 200;
};

Player.prototype = {

	preload: function() {
        game.load.image('spriteMain', 'assets/sprites/player.png');
	},

	create: function() {
		this.spriteMain = game.add.sprite(272, 560, 'spriteMain');
		game.physics.enable(this.spriteMain, Phaser.Physics.ARCADE);
		this.spriteMain.anchor.setTo(.5,.5);
        this.spriteMain.body.collideWorldBounds = true;
	},

	update: function() {
        levelTutorial.collide(this.spriteMain);
        if(game.physics.arcade.collide(levelTutorial.door, this.spriteMain)){
            player.playerMoving = false;
        }
    },

    moveLeft: function(){
        if(!this.playerMoving){
            this.playerMoving = true;
            this.spriteMain.body.velocity.x = -this.playerVelocity;
        }
    },

    moveRight: function(){
        if(!this.playerMoving){
            this.playerMoving = true;
            this.spriteMain.body.velocity.x = this.playerVelocity;
        }
    },

    moveUp: function(){
        if(!this.playerMoving){
            this.playerMoving = true;
            this.spriteMain.body.velocity.y = -this.playerVelocity;
        }
    },

    moveDown: function(){
        if(!this.playerMoving){
            this.playerMoving = true;
            this.spriteMain.body.velocity.y = this.playerVelocity;
        }
    },

    interact: function(){
        levelTutorial.overlapObjects(this.spriteMain);
    },

    render: function(info) {
        //game.debug.body(this.spriteMain);
        //game.debug.bodyInfo(this.spriteMain, 300, 32);
    }
	
};