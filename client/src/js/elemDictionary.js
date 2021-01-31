import Phaser from 'phaser'
import Elem from '../js/element.js'
import List from '../../node_modules/collections/_list'

//import List from "../framework/list.js"

export class BaseElem
{
    constructor(name, symbol, rarity, type)
    {
		this.name = name;
		this.symbol = symbol;
		this.type = type;
		this.rarity = rarity;
    }
    get Name()
	{
		return this.name;
    }
    get Symbol()
	{
		return this.symbol;
    }
    get Type()
	{
		return this.type;
    }
    get Rarity()
	{
		return this.rarity;
	}
    CreateUnique(minStatRolls)
    {
        //make a unique Element using this as base Element
        return 
    }

}
export var elemDict = {
    Copper: new BaseElem("Copper", "Au", 0, "Metal"),
    Aluminum: new BaseElem("Aluminum", "Al", 0, "Metal"),
    Cadmium: new BaseElem("Cadmium", "Ca", 1, "Metal"),
    Iron: new BaseElem("Iron", "Ir", 1, "Metal"),
    Silver: new BaseElem("Silver", "Si", 2, "Metal"),
    Chromium: new BaseElem("Chromium", "Ch", 2, "Metal"),
    Gold: new BaseElem("Gold", "Au", 3, "Metal"),
    Magnesium: new BaseElem("Magnesium", "Mg", 3, "Metal"),
    Platinum: new BaseElem("Platinum", "Pl", 4, "Metal"),
    Caesium: new BaseElem("Caesium", "Ce", 4, "Metal"),
    Gaan: new BaseElem("Gaan", "Ga", 0, "Alien"),
    Evri: new BaseElem("Evri", "Ev", 0, "Alien"),
    Usai: new BaseElem("Usai", "Us", 1, "Alien"),
    Olvo: new BaseElem("Olvo", "Ol", 1, "Alien"),
    Korix: new BaseElem("Korix", "Ko", 2, "Alien"),
    Ivain: new BaseElem("Ivain", "Iv", 2, "Alien"),
    Faze: new BaseElem("Faze", "Fa", 3, "Alien"),
    Zomne: new BaseElem("Zomne", "A", 3, "Alien"),
    Ultun: new BaseElem("Ultun", "Zo", 4, "Alien"),
    Cestrux: new BaseElem("Cestrux", "Cx", 4, "Alien"),
    Helium: new BaseElem("Helium", "He", 0, "Gas"),
    Oxygen: new BaseElem("Oxygen", "O", 0, "Gas"),
    Neon: new BaseElem("Neon", "Ne", 1, "Gas"),
    Flourine: new BaseElem("Flourine", "Fl", 1, "Gas"),
    Argon: new BaseElem("Argon", "Ar", 2, "Gas"),
    Chlorine: new BaseElem("Chlorine", "Ch", 2, "Gas"),
    Krypton: new BaseElem("Krypton", "Kr", 3, "Gas"),
    Nitrogen: new BaseElem("Nitrogen", "Ni", 3, "Gas"),
    Radon: new BaseElem("Radon", "Ra", 4, "Gas"),
    Xenon: new BaseElem("Xenon", "Xe", 4, "Gas"),
    Quartz: new BaseElem("Quartz", "Qu", 0, "Crystal"),
    Amethyst: new BaseElem("Amethyst", "Am", 0, "Crystal"),
    Sapphire: new BaseElem("Sapphire", "Sa", 1, "Crystal"),
    Topaz: new BaseElem("Topaz", "To", 1, "Crystal"),
    Ruby: new BaseElem("Ruby", "Ru", 2, "Crystal"),
    Lapis: new BaseElem("Lapis", "La", 2, "Crystal"),
    Diamond: new BaseElem("Diamond", "Di", 3, "Crystal"),
    Obsidian: new BaseElem("Obsidian", "Ob", 3, "Crystal"),
    Tanzinite: new BaseElem("Tanzinite", "Ta", 4, "Crystal"),
    Opal: new BaseElem("Opal", "Op", 4, "Crystal"),
};
export function AddBaseElemToDict(name, symbol, rarity, type)
{
    elemDict[name] = new BaseElem(name,symbol,rarity,type); //add element to database
    return elemDict[name];
}
export function RemoveBaseElemFromDict(name)
{
    delete elemDict[name];
}

export function GetTotalElemsInDict()
{
    var count = 0;
    for(var key in elemDict)
    {
        count++; //count how many keys in dictionary
    }
    return count;
}


//pick an element of a certain type, returns single element
export function RandomElementOfType(type)
{
    var list = SearchByRarityType(type);
    if (list != null)
        return (PickRandom(list)) //pick random element in array and return it
}
//pick an element of a certain rarity, returns single element
export function RandomElementOfRarity(rarity)
{
    var list = SearchByRarity(rarity);
    console.log(list);
    if (list != null)
        return (PickRandom(list))
}
export function RandomElementOfRarityAndType(rarity, type)
{
    var list = SearchByRarityType(rarity, type);
    if (list != null)
        return (PickRandom(list))
}
//search for element by rarity, returns list
export function SearchByRarity(rarity)
{
    var searchResult = new List();
    //for each element in dictionary
    for (var property in elemDict)
    {   //for each property inside that Element
        if (property.rarity == rarity)
        {//add any Element to the list that fits the criteria to the list to return
            searchResult.add(property);
        }
    }
    if (searchResult.length > 0)
        return searchResult;
}
//searches for an element by name and returns the single element, if found
export function SearchyByName(name)
{
    var searchResult = new List();
    //for each element in dictionary
    for (var property in elemDict)
    {   //for each property inside that Element
        if (property.name == name)
        {//add any Element to the list that fits the criteria to the list to return
            return property;
        }
    }
    return null;
}
//search for elements of a specified rarity and type, returns a list
//takes type Rarity 0 - 4 max and 'metal' 'gas' etc and 
export function SearchByRarityType(rarity, type)
{
    var searchResult = new List();
    //for each element in dictionary
    for (var property in elemDict)
    {   //for each property inside that Element
        if (property.rarity == rarity && property.type == type)
        {//add any Element to the list that fits the criteria to the list to return
            searchResult.add(property);
        }
    }
    if (searchResult.length < 1)
        return null;
    return searchResult;
}
//search for Elements by a specified type, returns a list
export function SearchByType(type)
{
    var searchResult = new List();
    //for each element in dictionary
    for (var property in elemDict)
    {   //for each property inside that Element
        if (property.type == type)
        {//add any Element to the list that fits the criteria to the list to return
            searchResult.add(property);
        }
    }
    if (searchResult.length < 1)
        return null;
    return searchResult;
}
//pick 1 random item in array
export function PickRandom(array)
{
    var rng = Math.floor(Math.random()*array.length);
    return array[rng];
}
//pick 1 random property from the objects keys
export function PickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
    {
        if (Math.random() < 1/++count)
           result = prop;
    }
    return result;
}