import Phaser from 'phaser'
import LoadingScreen from './scenes/LoadingScreen'
import Game from './scenes/Game'
class main extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
    }
      
    create ()
    {
     
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 1920,
    height: 1280,
    physics:{ 
        default: 'arcade',
        arcade: 
        {
            gravity: {y: 0},
            //gravity: {y: 300},
            //debug: true
        }
    }

    //note: scenes can be overlayed on top of eachother, so we can use them as windows
};

const game = new Phaser.Game(config);
game.scene.add('loadingscreen', LoadingScreen);
game.scene.add('game', Game);
//game.scene.start('loadingscreen');
game.scene.start('game');
