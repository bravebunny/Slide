TextWriter = function(g) {
	game = g;
};

TextWriter.prototype = {

	printHistory: function(text, x, y, size, delay, levelNumb) {
		levelTutorial.text = game.add.text(x, y, text, { font: "" + size + "pt Fixedsys", fill: "#363636", align: "center"});
        levelTutorial.text.alpha = 0;
        levelTutorial.text.anchor.setTo(0.5, 0.5);
        levelTutorial.tweenText = game.add.tween(levelTutorial.text).to({y: 670}, 1000 * levelTutorial.textVelocity, Phaser.Easing.Out, true, delay * levelTutorial.textVelocity, false);
        levelTutorial.tweenText = game.add.tween(levelTutorial.text).to( { alpha: 1 }, 1000 * levelTutorial.textVelocity, Phaser.Easing.Linear.None, true, delay * levelTutorial.textVelocity, false);
       	levelTutorial.textLine += 1;
        levelTutorial.tweenText.onComplete.add(levelNumb.textSequence, levelTutorial);
	},

	printSecondaryText: function(text, size, delay) {
		levelTutorial.secondaryText = game.add.text(player.spriteMain.x, player.spriteMain.y, text, { font: "" + size + "pt Fixedsys", fill: "#ffffff", align: "center"});
        levelTutorial.secondaryText.alpha = 1;
        levelTutorial.secondaryText.anchor.setTo(0.5, 0.5);
        game.add.tween(levelTutorial.secondaryText).to({y: player.spriteMain.y - 100}, 1000, Phaser.Easing.Out, true, delay, false);
        game.add.tween(levelTutorial.secondaryText.scale).to({x: 2, y:2}, 1000, Phaser.Easing.Linear.None, true, delay, false);
        game.add.tween(levelTutorial.secondaryText).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true, delay, false);
	},

	printTutorial: function(text, x, y, size, delay){
		if(levelTutorial.eraseTutorial){
			game.add.tween(levelTutorial.tutorialText).to({y: -10}, 800, Phaser.Easing.Out, true, delay, false);
			game.add.tween(levelTutorial.tutorialText).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true, delay, false)
		}
		else{
			levelTutorial.tutorialText = game.add.text(x, y, text, { font: "" + size + "pt Fixedsys", fill: "#ffffff", align: "center"});
	        levelTutorial.tutorialText.alpha = 0;
	        levelTutorial.tutorialText.anchor.setTo(0.5, 0.5);
	        game.add.tween(levelTutorial.tutorialText).to({y: 80}, 800, Phaser.Easing.Out, true, delay, false);
	        game.add.tween(levelTutorial.tutorialText).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, delay, false);
    	}
	},

	eraseText: function(delay,changeY){
		if(levelTutorial.tweenText){
			if(changeY){
				levelTutorial.tweenText = game.add.tween(levelTutorial.text).to( { alpha: 0 }, 1100, Phaser.Easing.Linear.None, true, 2.8 * delay * levelTutorial.textVelocity, false);
				levelTutorial.tweenText = game.add.tween(levelTutorial.text).to( { y: 712 }, 1000, Phaser.Easing.Linear.None, true, delay * levelTutorial.textVelocity, false);
			}
			else{
				levelTutorial.tweenText = game.add.tween(levelTutorial.text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 2 * delay * levelTutorial.textVelocity, false);
			}
		}
	} 	
	
};