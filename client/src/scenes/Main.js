import Phaser from 'phaser'
import electron from '../js/electron'
import elementJs, { GetRandomType } from '../js/element.js'
//import elemDictJs, { AddElemToDict, RandomElementOfType, RandomElementOfRarity* } from 
import * as elemDict from '../js/elemDictionary.js'
import particle from '../assets/img/circle.png'
import logoImg from '../assets/img/logo.png'
import slotbg from '../assets/img/slot_background.png'
import Anchor from 'phaser3-rex-plugins/plugins/anchor.js';
import ElemBase from '../js/ElemBase';


const Random = Phaser.Math.Between;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var logoX = 55;
var logoY = 50;
var ElemSlots = 150;
const slidingDeceleration = 10000;
const backDeceleration = 2000;
export default class Main extends Phaser.Scene
{
    preload() {
        var url;
        this.load.image('particle', particle);
        this.load.image('logo', logoImg);  
        this.load.image('slot_background', slotbg);
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js';
        this.load.plugin('rexgridtableplugin', url, true);
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscrollerplugin.min.js';
        this.load.plugin('rexscrollerplugin', url, true); 
      
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js';
        this.load.plugin('rexsliderplugin', url, true);  
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/white-dot.png';      
        this.load.image('dot', url);        
    }

    create() {
        //$.csv.function(csv, {options}, callback);

        var newCellObject = function (scene, cell) {
            var bg = scene.add.image(50, 50, 'slot_background',cell.index+1).setScale(.5, .5);
            var txt = scene.add.text(5, 5, cell.index+1);
            //var txt = scene.add.text(5, 5, cell.GetItems());
            var container = scene.add.container(0, 0, [bg, txt]);
            bg.setInteractive();
            return container;
        }
        this.input.on('pointerdown',this.startDrag,this);
        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(this, cell));
            //console.log('Cell ' + cell.index + ' visible');
        };
        
        var table = this.add.rexGridTable(800, 350, 1100, 490, {
            cellWidth: 100,
            cellHeight: 100,
            cellsCount: ElemSlots,
            columns: 10,
            cellVisibleCallback: onCellVisible.bind(this),
            clamplTableOXY: false
        });
        /*
        // draw bound
        this.add.graphics()
            .lineStyle(3, 0xffffff)
            .strokeRectShape(table.getBounds());
        */

        // drag table content
        table.scroller = this.plugins.get('rexscrollerplugin').add(table, {
                bounds: [
                    table.bottomTableOY,
                    table.topTableOY
                ],
                value: table.topTableOY,
                slidingDeceleration: slidingDeceleration,
                backDeceleration: backDeceleration
            });


        // drag table content
        var topRight = table.getTopRight();
        var bottomRight = table.getBottomRight();
        var thumb = this.add.image(0, 0, 'dot').setScale(4, 4);
        thumb.slider = this.plugins.get('rexsliderplugin').add(thumb, {
            endPoints: [{
                    x: topRight.x + 10,
                    y: topRight.y + 10
                },
                {
                    x: bottomRight.x + 10,
                    y: bottomRight.y - 10
                }
            ]
        });

        this.add.graphics()
            .lineStyle(3, 0xffffff, 1)
            .strokePoints(thumb.slider.endPoints);

        // 'valuechange' event
        table.scroller.on('valuechange', function (newValue) {
            table.setTableOY(newValue).updateTable();
            // reflect to slider
            thumb.slider.setValue(table.getTableOYPercentage());
        });
        thumb.slider.on('valuechange', function (newValue) {
            table.setTableOYByPercentage(newValue).updateTable();
            // reflect to scroller
            table.scroller.setValue(table.tableOY);
        });
      
        this.table = table;
        this.scrollerState = this.add.text(100, 0, '');
        const CANDIDATES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var GetRandomWord = function (min, max, candidates) {
        if (candidates === undefined) {
            candidates = CANDIDATES;
        }
        var count = (max === undefined) ? min : Phaser.Math.Between(min, max);
        var word = '';
        for (var j = 0; j < count; j++) {
            word += Phaser.Utils.Array.GetRandom(candidates);
        }
        return word;
    }

    var CreateContent = function () {
        var words = [];
        for (var i = 0, cnt = Phaser.Math.Between(3, 20); i < cnt; i++) {
            words.push(GetRandomWord(3, 10));
        }
        return words.join(' ');
    }

        /////// Element stuff
              
        const logo = this.add.image(logoX,logoY, 'logo');
        logo.displayWidth = 70;
        logo.displayHeight = 70;
        //const paddleLeft = this.add.rectangle(50, 250, 30, 50, 0xffffff, 1);
        //this.physics.add.existing(paddleLeft, true);

        //fire test particle


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


        //this.physics.add.existing(circle, true);
        //ball.body.setBounce(1,1)
        //this.physics.add.collider(group1, ball);
        //this.physics.add.collider(this)
        this.input.on('pointerdown', function (pointer) {

            console.log('down');
    
        }, this);
        let e1 = elemDict.AddBaseElemToDict("Copper", "Co", 0, "Metal");
        elemDict.AddBaseElemToDict("Aluminum", "Al", 0, "Metal");
        elemDict.AddBaseElemToDict("Cadmium", "Ca", 1, "Metal");
        elemDict.AddBaseElemToDict("Iron", "Ir", 1, "Metal");
        elemDict.AddBaseElemToDict("Silver", "Si", 2, "Metal");
        elemDict.AddBaseElemToDict("Chromium", "Ch", 2, "Metal");
        elemDict.AddBaseElemToDict("Gold", "Au", 3, "Metal");
        elemDict.AddBaseElemToDict("Magnesium", "Mg", 3, "Metal");
        console.log("RANDOM ELEMENT: " + elemDict.RandomElementOfRarity(1));
        console.log(e1);
        //console.log(getelem)
        //AddElemToDict();
        //AddElemToDict();
    // Platinum: new Elem("Platinum", "Pl", 4, "Metal", 0),
    // Caesium: new Elem("Caesium", "Ce", 4, "Metal", 0),
    // Gaan: new Elem("Gaan", "Ga", 0, "Alien", 0),
    // Evri: new Elem("Evri", "Ev", 0, "Alien", 0),
    // Usai: new Elem("Usai", "Us", 1, "Alien", 0),
    // Olvo: new Elem("Olvo", "Ol", 1, "Alien", 0),
    // Korix: new Elem("Korix", "Ko", 2, "Alien", 0),
    // Ivain: new Elem("Ivain", "Iv", 2, "Alien", 0),
    // Faze: new Elem("Faze", "Fa", 3, "Alien", 0),
    // Zomne: new Elem("Zomne", "A", 3, "Alien", 0),
    // Ultun: new Elem("Ultun", "Zo", 4, "Alien", 0),
    // Cestrux: new Elem("Cestrux", "Cx", 4, "Alien", 0),
    // Helium: new Elem("Helium", "He", 0, "Gas", 0),
    // Oxygen: new Elem("Oxygen", "O", 0, "Gas", 0),
    // Neon: new Elem("Neon", "Ne", 1, "Gas", 0),
    // Flourine: new Elem("Flourine", "Fl", 1, "Gas", 0),
    // Argon: new Elem("Argon", "Ar", 2, "Gas", 0),
    // Chlorine: new Elem("Chlorine", "Ch", 2, "Gas", 0),
    // Krypton: new Elem("Krypton", "Kr", 3, "Gas", 0),
    // Nitrogen: new Elem("Nitrogen", "Ni", 3, "Gas", 0),
    // Radon: new Elem("Radon", "Ra", 4, "Gas", 0),
    // Xenon: new Elem("Xenon", "Xe", 4, "Gas", 0),
    // Quartz: new Elem("Quartz", "Qu", 0, "Crystal", 0),
    // Amethyst: new Elem("Amethyst", "Am", 0, "Crystal", 0),
    // Sapphire: new Elem("Sapphire", "Sa", 1, "Crystal", 0),
    // Topaz: new Elem("Topaz", "To", 1, "Crystal", 0),
    // Ruby: new Elem("Ruby", "Ru", 2, "Crystal", 0),
    // Lapis: new Elem("Lapis", "La", 2, "Crystal", 0),
    // Diamond: new Elem("Diamond", "Di", 3, "Crystal", 0),
    // Obsidian: new Elem("Obsidian", "Ob", 3, "Crystal", 0),
    // Tanzinite: new Elem("Tanzinite", "Ta", 4, "Crystal", 0),
    // Opal: new Elem("Opal", "Op", 4, "Crystal", 0),
    }    
    startDrag(pointer,targets)
    {
        this.input.on('pointerdown', this.startDrag,this);
        this.dragObj = targets[0];
        this.input.on('pointermove', this.doDrag,this);
        this.input.on('pointerup', this.stopDrag,this);
    }
    doDrag(pointer)
    {
        this.dragObj.x = pointer.x;
        this.dragObj.y = pointer.y;
    }
    stopDrag()
    {
        this.input.on('pointerdown', this.startDrag,this);
        this.input.off('pointermove', this.doDrag,this);
        this.input.off('pointerup', this.stopDrag,this);
    }
    update() {
        this.scrollerState.setText(this.table.scroller.state + "\n" + this.table.tableOY);
    }
}

