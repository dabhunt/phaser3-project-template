import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
    preload()
    {

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
    }
}