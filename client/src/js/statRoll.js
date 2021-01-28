
/*
class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create ()
    {
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
*/
Phaser.GameObjects.game
var chanceToReroll = 0;
var minReroll = 0;//minimum amount a certain rarity gets of stat bonuses
var statCount;
var stat;

//legendarys get 64 rolls per stat, or funtil they 

//Based on how many rolls you get through a stat
//50% of  

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const RandomInt = Phaser.Math.Between;
//commons get 10% reroll chance
//unusuals get 15% reroll chance
//rares get 25% reroll chance
//epics get 50% reroll chance

//Create new element process
// var newElement = {
// 	Rarity = 2;
// };
//based on the rarity of the element, assign the likelyhood of getting additional Stat bonuses

function CombineElements(elementInput,blueprint)
{
	avgLuckBonus = 0;
	avgMagnetBonus= 0;
	avgBurnBonus = 0;
	avgDrillBonus = 0;
	sumLuckBonus = 0;
	sumMagnetBonus = 0;
	sumBurnBonus = 0;
	sumDrillBonus = 0;
	//loop through each input element, adding the bonuses together for a sum
	array.forEach(elementInput => {

	});
	let bonus = [
		{
			name: "Luck",
			amount: 0, //0% bonus
		},
		{
			name: "Magnet",
			amount: 0, 
		},
		{
			name: "Burn",
			amount: 0, 
		},
		{
			name: "Drill",
			amount: 0, 
		},
		
	]
	let element = {
		name: "Gold",
		symbol: "Au",
		type: "Metal",
		bonuses: bonus,
	}
	return newElement;
}
function Element()
{

}
switch(newElement.Rarity)
{
	case 0:
	//common
	chanceToReroll = .10;//10%
	minReroll = 1; //how many stat rolls are guaranteed
		break;
	case 1:
	//unusual
	chanceToReroll = .15;//15%
	minReroll = 2;  //how many stat rolls are guaranteed
		break;
	case 2:
	//rare
	chanceToReroll = .22;
	minReroll = 4;
		break;
	case 3:
	//epic
	chanceToReroll = .34;
	minReroll = 8;
		break;
	case 4:
	//legendary
	chanceToReroll = .50;
	minReroll = 16;
		break;
}
var statRolls = 0; //
var rng = 0;
While (statRolls < minReroll || rng < chanceToReroll)
{
	//reroll 
	statRolls++; //track minimum rolls
	rng = Phaser.Math.Between;
	//LMTs Elements 
	newElement = {
		Luck: newElement.Luck + .1,
		ChargeHours: newElement.ChargeHours + .1,
		MagnetismMinutes : 1/10
	};
}