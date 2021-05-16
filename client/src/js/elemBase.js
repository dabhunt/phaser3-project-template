export default class ElemBase extends Phaser.GameObjects.Container {
    constructor(data){
        let {scene, x,y,name,rarity, type, image,depth} = data;
        let spriteRarity = new Phaser.GameObjects.Sprite(scene,0,0,rarity);
        let textName = Phaser.GameObjects.BitmapText(scene,0,0,"test"+name);
        super(scene,x,y, [spriteRarity, textName]);
        this.spriteRarity = spriteRarity;
        this.textName = textName;
        this.depth = depth;
        this.scene = scene;
        this.scene.add.existing(this);

    }
}