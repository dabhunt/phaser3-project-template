import Phaser from 'phaser'
import LoadingScreen from './scenes/LoadingScreen'
import Game from './scenes/Game'
import Main from './scenes/Main'
import GridTablePlugin from 'phaser3-rex-plugins/plugins/gridtable-plugin.js';
var config;
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

config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 1920,
    height: 920,
    physics:{ 
        default: 'arcade',
        arcade: 
        {
            gravity: {y: 0},
            //gravity: {y: 300},
            //debug: true
        }
    },
    plugins: {
        global: [{
            key: 'rexGridTablePlugin',
            plugin: GridTablePlugin,
            start: true
        },]
    }
    //note: scenes can be overlayed on top of eachother, so we can use them as windows
};
var game = new Phaser.Game(config);
game.scene.add('loadingscreen', LoadingScreen);
game.scene.add('game', Game);
game.scene.add('main', Main);
game.scene.start('main');
//game.scene.start('loadingscreen');
