
import Phaser from 'phaser'
import { BaseElem, elemDict, PickRandom, RandomElementOfRarityAndType, SearchByRarityType, SearchyByName } from './elemDictionary';
import bonus from './bonus.js';
var chanceToReroll = 0;
var minReroll = 0;//minimum amount a certain rarity gets of stat bonuses
var statCount;
var stat;
var minBonus = 10;
var maxBonus = 20;
var oneOfEachMulti = 2;
var fourOfAKindMulti = 3;
var threeOfAKindMulti = 2;

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
export class ElemList
{
	constructor(elementArray)
	{
		this.Elems = new List();
		this.Elems.push(elementArray)
		var highestValueElem = elementArray[0];
		function GetHighestValue()
		{
			for (var i = 0; i < this.Elems.length; i ++)
			{// if the current element is higher value than the highest so far, replace it
				if (this.Elems[i].rarity  > highestValueElem.rarity)
					highestValueElem = this.Elems[i].rarity;
			}
			return highestValueElem;
		}
	}
}

export default class Elem extends BaseElem
{
	constructor(name, symbol, rarity, type, minStatRolls, shiny)
	{
		super(name, symbol, rarity, type);
		var bonus;
		for (var prop in bonusName) //for each type of bonus, initialize an empty bonus
    	{
			bonus[prop] = new bonus(prop, 0);
		}
		this._minStatRolls = minStatRolls;
		this._bonus = bonus;
		//this.valueScore = valueScore;
		this._shiny = shiny;
	}
	get Shiny()
	{
		return this._shiny;
	}
	get Bonus()
	{
		return this._bonus;
	}
	SetBonus(name, newAmount)
	{
		if (this._bonus[name] == null)
			return null;
		this._bonus[name] = new bonus(name,newAmount);
	}

}
//get random Element type
export function GetRandomType()
{
	var randomNumber = Math.floor(Math.random()*type.length);
	return type[randomNumber];
}
//get random Bonus name
export function GetRandomBonusName()
{
	var randomNumber = Math.floor(Math.random()*type.length);
	return bonusName[randomNumber];
}
//based on the rarity of the element, assign the likelyhood of getting additional Stat bonuses

export function CombineElements(elementInput, blueprintBonus)
{
	var duplicateCount;
	//bools to track combinations
	var oneOfEach = false; //track 1 of each element type in inputs
	var ThreeOfAKind = false; 
	var FourOfAKind = false;

	var typeSum = new typeObj();
	var elemSum = new elemDict();
	
	var lowestRarityInput = elementInput[0];
	var highestRarityInput = elementInput[0];
	var sumValueScores = 0;
	for (i = 0; i < elementInput.length; i++)
	{
		//increment the amount of that type stored
		typeSum[elementInput[i].type] ++; 
		//add element's value score to the sum
		sumValueScores += elementInput[i].valueScore;
		//store the value of the highest Rarity Element
		if (elementInput[i].rarity > highestRarityInput)
			highestRarityInput = elementInput[i].rarity;
		//store the value of the lowest Rarity Element
		if (elementInput[i].rarity < lowestRarityInput)
			lowestRarityInput = elementInput[i].rarity;
		//check for 4 of a kind
		if (typeSum[elementInput[i].type] >= 4)
		{
			FourOfAKind = true; 
			ThreeOfAKind = false; //4 of a kind overrides 3, don't check for 3 if we already got a 4
		}
		else if (typeSum[elementInput[i].name] >= 3)
			ThreeOfAKind = true;
		//check for 1 of each type combination
		else if (typeSum[elementInput[i].type] == 1)
		{
			oneOfEach = true;
		}
		else
			oneOfEach = false;
	}
	//get the average value score, and multiply it
	var avgValueScore = (sumValueScores/elementInput.length);

	//do something if 1 of each of the 4 types are combined (+1 rarity)
	if (oneOfEach)
	{
		var newValueScore;
		let randRarity = Phaser.Math.Between(lowestRarityInput, highestRarityInput);
		rng = Phaser.Math.Between(1,100);
		if (rng <= 10)//10% chance of great outcome
		{
			newValueScore = avgValueScore * (oneOfEachMulti+.5);
			CreateRandomElement(randRarity, newValueScore, null);
		}
		else if (rng <= 50)//40% chance of good outcome
		{
			newValueScore = avgValueScore * (oneOfEachMulti);
			CreateRandomElement(randRarity, newValueScore, null);
		}
		else //50% chance of bad outcome
		{
			//3 of 4 inputs you get back, and you get 4 of -1 rarity elements
		}
	}
	if (FourOfAKind)
	{
		newValueScore = avgValueScore * (fourOfAKindMulti);
		elementInput[0].CreateUnique();
		CreateRandomElement(elementInput[0].rarity, newValueScore, elementInput[0].type, elementInput[0]);//create random element of same rarity, but shiny and with better stats
	}
	if (ThreeOfAKind)
	{

	}
		
	return newElement;
}
// function CreateRandomElement(rarity, minStatRolls)
// {
// 	var type = GetRandomType(); //if no type is specified, random one assigned
// 	return CreateRandomElement(rarity, minStatRolls, type)
// }
/*
Create a random Element of the specified rarity, min stat rolls, and type.
type can be null or false and a random type will be picked
*/
export function CreateRandomElement(rarity, minStatRolls, type)
{
	if (type == null || type == false)
	{
		type = GetRandomType();
	}
	var newElem = RandomElementOfRarityAndType(rarity, type);
	CreateUniqueElement(newElem, minStatRolls, null);
}
export function CreateUniqueElement(name, minStatRolls, shinyElement)
{
	var minRolls = 0;
	var newElement;
	var baseElem = SearchyByName(name);
	if (baseElem == null)
		return null;
	if (shinyElement != null)
		newElement = new Elem(shinyElement.name, shinyElement.symbol, shinyElement.rarity, shinyElement.type, minStatRolls, true);
	else
		newElement = new Elem(baseElem.name, baseElem.symbol, baseElem.rarity, baseElem.type,  );
	var statRolls = 0; //stat rolls tracks how many times the newly created element got stat rolls
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
	//if the minRoll number passed in is greater than the rarity default, increase it
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
	newElement.valueScore = statRolls; //valueScore of an element is always equal to the amount of stat rolls it got
	return newElement;
	
}

