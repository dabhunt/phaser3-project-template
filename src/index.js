import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
      const logo = this.add.image(1920/2, 1280/2, 'logo');
      logo.scale =.2;
        this.tweens.add({
            targets: logo,
            y: 250,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
        this.tweens.add({
            targets: logo,
            scale: .4,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1280,
    scene: MyGame
};

const game = new Phaser.Game(config);
