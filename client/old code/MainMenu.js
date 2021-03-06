var music;
var MainMenu = function(game){};

MainMenu.prototype = {

	preload: function() {

		//load image assets
		game.load.path = 'assets/img/';
		
		game.load.image('background', 'woodbackground.jpg');
		game.load.image('overlay', 'overlay.png');
 		game.load.image('menu', 'menu.png');
 		game.load.image('x', 'x0.png');
 		game.load.image('triangle', 'triangle0.png');
 		game.load.image('square', 'square0.png');
 		game.load.image('circle', 'circle0.png');
 		game.load.image('moodchart', 'moodchart.png');
 		game.load.image('warning', 'warningtext.png');
 		game.load.image('trianglechart', 'trianglechart.png');
 		game.load.image('credits', 'credits.png');

 		game.load.physics('spritephysics', 'spritephysics.json')
		game.load.atlasJSONHash('spritesheet', 'spritesheet.png', 'sprites.json');
		
		// load audio assets
		game.load.path = 'assets/sound/';
		game.load.audio('music','music.mp3');
		game.load.audio('tutmusic','tutmusic.mp3');
		game.load.audio('transform','changepoof.mp3');
		game.load.audio('endsound','endsound.mp3');
		for (i = 0; i < 3; i++) {
			game.load.audio('poof' + i, ['deathpoof' + i + '.mp3']);
		}
		for (i = 1; i < 7; i++){
			var soundtype = "flee";
			game.load.audio("flee" + i, ["flee" + i + '.mp3']);
			soundtype = "anger";
			game.load.audio("anger" + i, ["anger" + i + '.mp3']);
			soundtype = "follow";
			game.load.audio("follow" + i, ["follow" + i + '.mp3']);

		}
	},

	create: function() {

		//adds the menu image for the main menu
		var menu = game.add.image(0, 0, 'menu');
		menu.scale.x *= .5;
		menu.scale.y *= .5;
		if (!music){
			music = game.add.audio('music');
		}
		if (!music.isPlaying){
			music.play(null, 0,.37,true);
		}
		//adds instructions to continue that fades in and out on the screen
		var startspace = game.add.image(game.world.centerX, 575, 'spritesheet', 'startspace');
		startspace.scale.x *= .5;
		startspace.scale.y *= .5;
		startspace.anchor.set(0.5);
    	startspace.alpha = 0;
		game.add.tween(startspace).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);


		//adds the space key as an input
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//if the W key is pressed, go to the start function
		spaceKey.onDown.addOnce(this.start, this);

	},
	
	start: function() {

		//sends the player to the tutorial state
		//game.state.start('Tutorial');
		game.state.start('Tutorial');
	},
	shutdown: function(){
		music.stop();
	},

}