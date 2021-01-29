var ElemJS = require('element');

export default class ElemDictionary {
    
}
export var elemDict = {
    Copper: new Elem("Copper", "Au", 0, "Metal", 0),
    Aluminum: new Elem("Aluminum", "Al", 0, "Metal", 0),
    Cadmium: new Elem("Cadmium", "Ca", 1, "Metal", 0),
    Iron: new Elem("Iron", "Ir", 1, "Metal", 0),
    Silver: new Elem("Silver", "Si", 2, "Metal", 0),
    Chromium: new Elem("Chromium", "Ch", 2, "Metal", 0),
    Gold: new Elem("Gold", "Au", 3, "Metal", 0),
    Magnesium: new Elem("Magnesium", "Mg", 3, "Metal", 0),
    Platinum: new Elem("Platinum", "Pl", 4, "Metal", 0),
    Caesium: new Elem("Caesium", "Ce", 4, "Metal", 0),
    Gaan: new Elem("Gaan", "Ga", 0, "Alien", 0),
    Evri: new Elem("Evri", "Ev", 0, "Alien", 0),
    Usai: new Elem("Usai", "Us", 1, "Alien", 0),
    Olvo: new Elem("Olvo", "Ol", 1, "Alien", 0),
    Korix: new Elem("Korix", "Ko", 2, "Alien", 0),
    Ivain: new Elem("Ivain", "Iv", 2, "Alien", 0),
    Faze: new Elem("Faze", "Fa", 3, "Alien", 0),
    Zomne: new Elem("Zomne", "A", 3, "Alien", 0),
    Ultun: new Elem("Ultun", "Zo", 4, "Alien", 0),
    Cestrux: new Elem("Cestrux", "Cx", 4, "Alien", 0),
    Helium: new Elem("Helium", "He", 0, "Gas", 0),
    Oxygen: new Elem("Oxygen", "O", 0, "Gas", 0),
    Neon: new Elem("Neon", "Ne", 1, "Gas", 0),
    Flourine: new Elem("Flourine", "Fl", 1, "Gas", 0),
    Argon: new Elem("Argon", "Ar", 2, "Gas", 0),
    Chlorine: new Elem("Chlorine", "Ch", 2, "Gas", 0),
    Krypton: new Elem("Krypton", "Kr", 3, "Gas", 0),
    Nitrogen: new Elem("Nitrogen", "Ni", 3, "Gas", 0),
    Radon: new Elem("Radon", "Ra", 4, "Gas", 0),
    Xenon: new Elem("Xenon", "Xe", 4, "Gas", 0),
    Quartz: new Elem("Quartz", "Qu", 0, "Crystal", 0),
    Amethyst: new Elem("Amethyst", "Am", 0, "Crystal", 0),
    Sapphire: new Elem("Sapphire", "Sa", 1, "Crystal", 0),
    Topaz: new Elem("Topaz", "To", 1, "Crystal", 0),
    Ruby: new Elem("Ruby", "Ru", 2, "Crystal", 0),
    Lapis: new Elem("Lapis", "La", 2, "Crystal", 0),
    Diamond: new Elem("Diamond", "Di", 3, "Crystal", 0),
    Obsidian: new Elem("Obsidian", "Ob", 3, "Crystal", 0),
    Tanzinite: new Elem("Tanzinite", "Ta", 4, "Crystal", 0),
    Opal: new Elem("Opal", "Au", 4, "Op", 0),
};
export function AddElemToDict(name, symbol, rarity, type)
{
    elemDict[type][rarity][name] = new Elem(name,symbol,rarity,type,0); //files the new Element with others of same type, then of same rarity.
}
export function RemoveElemFromDict(name)
{
    delete elemDict[name];
}
export function GetRandomOfType()
{
    
}
export function GetTotalElemsInDict()
{
    var count = 0;
    for(var key in elemDict) {
        count++; //count how many keys in dictionary
    }
    return count;
}
//pick 1 random item in array
export function Pick(array)
{
    var rng = Math.floor(Math.random()*array.length);
    return array[rng];
}
//takes type 'metal' 'gas' etc and Rarity 0 - 4 max
//both type and rarity are specified
export function PickElementName(type, rarity)
{
   return PickRandomProperty(elemDict[type][rarity]);
}
//rarity not specified
export function PickElementOfType(type)
{
    var rarity = Math.floor(Math.random()*4); //get random element rarity
    return PickRandomProperty(elemDict[type][rarity]); //use specified type
}
//type not specified
export function PickElementOfRarity(rarity)
{
    var type = PickRandomProperty(elemDict); //get random type from dictionary
    return PickRandomProperty(elemDict[type][rarity]);//use specified rarity
}

//pick 1 random property from the objects keys
export function PickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

let newDict = {
    //type
    //then rarity
    Metal: ,
    Gas:
    Crystal:
    Alien: 
};
newDict.Metal.Rarity

