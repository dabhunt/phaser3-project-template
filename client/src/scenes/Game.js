import Phaser from 'phaser'
import electron from '../js/electron'
import particle from '../assets/img/circle.png'
//ring speeds
var outerRingSpeed = -.03;
var midRingSpeed = .025;
var innerRingSpeed = -.02;
var nucleusSpeed = .015;
//ring amounts
var outerRingAmount = 10;
var midRingAmount = 4;
var innerRingAmount = 4;
var nucleusRingAmount = 3;
//outer ring diameter
var outerDiameter = 300;
//shrink multiplier
var shrinkMulti = .8;
var shrinkFlat = 70;
//center point rings rotate around
var centerX = 400;
var centerY = 300;

var outerGroup;
var midGroup;
var innerGroup;
var nucleusGroup;
var curParticle;
var ballColliderhash;
var collider;
export default class Game extends Phaser.Scene
{

    preload()
    {
        //this.load.image('ball', 'assets/sprites/shinyball.png');
        this.load.image('particle', particle);
    }
    create()
    {        
        this.add.text(400, 500, "Crypto Chemist");
        //const paddleLeft = this.add.rectangle(50, 250, 30, 50, 0xffffff, 1);
        //this.physics.add.existing(paddleLeft, true);
        
        //circle rotate
        outerGroup = this.physics.add.group({ key: 'particle', quantity: outerRingAmount, bounceX: 1, bounceY: 1, mass: 500 });
        midGroup = this.physics.add.group({ key: 'particle', quantity: midRingAmount, bounceX: 1, bounceY: 1, mass: 500 });
        innerGroup = this.physics.add.group({ key: 'particle', quantity: innerRingAmount, bounceX: 1, bounceY: 1, mass: 500 });
        nucleusGroup = this.physics.add.group({ key: 'particle', quantity: nucleusRingAmount, bounceX: 1, bounceY: 1, mass: 500 });
        //add physics to group 1 outer ring'
        //fire test particle
        const curParticle = this.fireParticle(-600, outerGroup);

        // this.physics.add.collider(
        //     outerGroup,
        //     outerGroup,
        // );
        //this.group1 = this.physics.add.group();
        // this.physics.add.existing(this.group1, circle)
        // this.physics.add.collider()
        // this.circle1 = new Phaser.Geom.Circle(centerX, centerY, outerDiameter);
        // this.circle2 = new Phaser.Geom.Circle(centerX, centerY, outerDiameter*shrinkMulti);
        // this.circle3 = new Phaser.Geom.Circle(centerX, centerY, outerDiameter*Math.pow(shrinkMulti,2));
        // this.circle4 = new Phaser.Geom.Circle(centerX, centerY, outerDiameter *Math.pow(shrinkMulti,4));

        this.circle1 = new Phaser.Geom.Circle(centerX, centerY, outerDiameter);
        this.circle2 = new Phaser.Geom.Circle(centerX, centerY, outerDiameter-shrinkFlat);
        this.circle3 = new Phaser.Geom.Circle(centerX, centerY, outerDiameter-shrinkFlat*2);
        this.circle4 = new Phaser.Geom.Circle(centerX, centerY, outerDiameter-shrinkFlat*4.5);

        Phaser.Actions.PlaceOnCircle(outerGroup.getChildren(), this.circle1);
        Phaser.Actions.PlaceOnCircle(midGroup.getChildren(), this.circle2);
        Phaser.Actions.PlaceOnCircle(innerGroup.getChildren(), this.circle3);
        Phaser.Actions.PlaceOnCircle(nucleusGroup.getChildren(), this.circle4);
        //this.physics.add.existing(circle, true);
        //ball.body.setBounce(1,1)
        //this.physics.add.collider(group1, ball);
        //this.physics.add.collider(this)
        this.input.on('pointerdown', function (pointer) {

            console.log('down');
            this.fireParticle(-600, outerGroup);
            this.add.image(pointer.x, pointer.y, 'particle');
    
        }, this);
    }

    update ()
    {
        Phaser.Actions.RotateAroundDistance(outerGroup.getChildren(), this.circle1, outerRingSpeed, this.circle1.radius);
        Phaser.Actions.RotateAroundDistance(midGroup.getChildren(), this.circle2, midRingSpeed, this.circle2.radius);
        Phaser.Actions.RotateAroundDistance(innerGroup.getChildren(), this.circle3, innerRingSpeed, this.circle3.radius);
        Phaser.Actions.RotateAroundDistance(nucleusGroup.getChildren(), this.circle4, nucleusSpeed, this.circle4.radius);
    }
    collision(ball, outer)
    { 
        console.log("Outer Object", outer, ball)
        ball.setAlpha(.5);
        outer.setAlpha(.5);
        //outerGroup.add(ball);
        //ball.add();
        if (curParticle != null && ball.name === curParticle.name)
        {
            outerGroup.add(curParticle);
            collider.destroy();
            curParticle = null;
            
        }
            
        //outerGroup = this.physics.add.group(ball);
        console.log("collision");
        //outerGroup.setAlpha(.5);
        // var tween = this.tweens.add({
        //     targets: ball,
        //     setAlpha: 1,
        //     ease: 'Power1',
        //     duration: 2000,
        //     delay: 1000
        // });
    }
    fireParticle(velocity, outerGroup)
    {
        const ball = this.add.circle(1920, 600, 20, 0xffffff, 1)
        this.physics.add.existing(ball);
        ball.body.setCollideWorldBounds(true, 1 , 1);
        ball.body.setVelocity(velocity, 0);//300 300
        ball.body.setBounce(1,1);
        curParticle = ball; //update global variable
        collider = this.physics.add.collider(
            outerGroup,
            ball,
            this.collision,
            null,
            this
        );
        console.log("Collider:", collider)
        return ball; 
    }
}