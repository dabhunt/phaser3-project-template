import Phaser from 'phaser'
import logoImg from '../assets/img/logo.png'
export default class Game extends Phaser.Scene
{
    preload()
    {
        //this.load.image('ball', 'assets/sprites/shinyball.png');
        //this.load.image('logo', logoImg);
    }
    create()
    {
        this.add.text(400, 500, "GAME SCENE");

        const ball = this.add.circle(500, 250, 20, 0xffffff, 1);
        this.physics.add.existing(ball);
        ball.body.setCollideWorldBounds(true, 1 , 1);
        ball.body.setVelocity(-200, 0);//300 300
        ball.body.setBounce(1,1)

        const paddleLeft = this.add.rectangle(50, 250, 30, 50, 0xffffff, 1);
        this.physics.add.existing(paddleLeft, true);

        //paddleLeft.body.setBounce(1,1);
        //const body = paddleLeft.body as Phaser.Physics.Arcade.Body;
        this.physics.add.collider(paddleLeft, ball);
        //circle rotate
        var circleDist = 500;
        var otherDist = 100;
        this.group = this.add.group();

        for (let i = 0; i < circleDist; i++)
        {
            this.group.create(i * otherDist, i * 1, 'ball');
        }
    }

    update ()
    {
        Phaser.Actions.RotateAroundDistance(this.group.getChildren(), { x: 400, y: 300 }, 0.1, 200);
    }
}