import Phaser from 'phaser'
import logoImg from '../assets/img/logo.png'
export default class LoadingScreen extends Phaser.Scene
{
    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
        var screenWidth = 1920;
        var screenHeight = 1280;
        const text = this.add.text(screenWidth/2, 100+screenHeight/2, "Crypto Chemist");
        text.setOrigin(.5,.5);
        //text.setFont('Montserrat');
        text.setFontSize(50);
        const logo = this.add.image(screenWidth/2, screenHeight/2, 'logo');
        logo.scale =.2;
        this.tweens.add({
            targets: logo,
            y: 350,
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
        this.tweens.add({
            targets: logo,
            rotation: 6.3, 
            duration: 2000,
            ease: "Bounce",
            yoyo: true,
            loop: -1
        });
    }
}