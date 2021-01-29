
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
var chanceToReroll = 0;
var minReroll = 0;//minimum amount a certain rarity gets of stat bonuses
var statCount;
var stat;
var minBonus = 10;
var maxBonus = 20;

var type = [
	'Metal',
	'Alien',
	'Gas',
	'Crystal',
];
let typeObj = {
	Metal: 0,
	Alien: 0,
	Gas: 0,
	Crystal: 0,
};
var bonusName = [
	'Luck',
	'Burn',
	'Magnetism',
	'Drill',
];
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
class ElemList
{
	constructor(elementArray)
	{
		this.Elems = new List();
		this.Elems.push(elementArray)

		function GetHighestValue()
		{
			for (var i = 0; i < this.Elems.length; i ++)
			{
				this.Elems[i].
			}
			return 
		}
	}
}

class Elem 
{
	constructor(name, symbol, rarity, type, valueScore)
	{
		let bonus = [
			{
				name: "Luck",
				amount: 0, //0% bonus
			},
			{
				name: "Magnetism",
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
		this.name = name;
		this.symbol = symbol;
		this.bonus = bonus;
		this.type = type;
		this.rarity = rarity;
		this.valueScore = valueScore;
		function GetType()
		{
			return this.type;
		}
		function GetBonus()
		{
			return this.bonus;
		}

	}

}
//get random Element type
function GetRandomType()
{
	var randomNumber = Math.floor(Math.random()*type.length);
	return type[randomNumber];
}
//get random Bonus name
function GetRandomBonusName()
{
	var randomNumber = Math.floor(Math.random()*type.length);
	return bonusName[randomNumber];
}
//based on the rarity of the element, assign the likelyhood of getting additional Stat bonuses

function CombineElements(elementInput, blueprintBonus)
{
	var duplicateCount;
	//one of each type
	var typeSum = new typeObj();
	for (i = 0; i < elementInput.length, i++)
	{
		typeSum[elementInput[i].type] ++; //increment the amount of that type stored
		//check for 4 of a kind
		if (typeSum[elementInput[i].type] >= 4)
		{

		}
		else if (typeSum[elementInput[i].name] >= 3)
		{

		}
	}

	return newElement;
}
function CreateRandomElement(rarity, minStatRolls)
{
	var type = GetRandomType(); //if no type is specified, random one assigned
	return CreateRandomElement(rarity, minStatRolls, type)
}
function CreateRandomElement(rarity, minStatRolls, type)
{
	var minRolls = 0;
	var newElement = new Elem(rarity, type);
	var statRolls = 0;
	var rng = 0;
	//based on Rarity, assign chance to reroll, and minimum guaranteed stat rolls
	switch(newElement.rarity)
	{
		case 0:
			//common
			chanceToReroll = .10;//10%
			minRolls = 1; //how many stat rolls are guaranteed
			break;
		case 1:
			//strange
			chanceToReroll = .15;//15%
			minRolls = 2;  //how many stat rolls are guaranteed
			break;
		case 2:
			//rare
			chanceToReroll = .22;
			minRolls = 4;
			break;
		case 3:
			//epic
			chanceToReroll = .34;
			minRolls = 8;
			break;
		case 4:
			//legendary
			chanceToReroll = .50;
			minRolls = 16;
			break;
	}
	//if the minRoll# passed in is greater than the rarity default, change it
	if (minStatRolls > minRolls)
		minRolls = minStatRolls;

	switch(newElement.type)
	{
		case 'Metal':
			newElement.primaryBonus = 'Magnetism';
			newElement.secondaryBonus = 'Burn';
			break;
		case 'Alien':
			newElement.primaryBonus = 'Luck';
			newElement.secondaryBonus = 'Magnetism';
			break;
		case 'Gas':
			newElement.primaryBonus = 'Burn';
			newElement.secondaryBonus = 'Drill';
			break;
		case 'Crystal':
			newElement.primaryBonus = 'Drill';
			newElement.secondaryBonus = 'Luck';
			break;
	}
	//Keep Doing stat rolls UNTIL the minimum is reached & the rng chance to reroll fails
	While (statRolls < minRolls || rng < chanceToReroll)
	{
		statRolls++; //track minimum rolls
		//get random number between 10 and 20
		bonus = Phaser.Math.Between(minBonus, maxBonus);
		//apply bonus
		newElement[GetRandomBonusName()] += (bonus/10);
	}
	return newElement;
	
}

