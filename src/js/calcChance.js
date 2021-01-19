//this is calculated for each Element type, and rarity combination
//ex common Alien Element, Rare Crystal Element, etc
var LegendaryChance = function (scene, text, type, rarity)
{
    //in order to determine the chance of creating a legendary,
    //we need to compare 2 ratios, and choose the larger one and multiply it by .5, unless it's greater than 1, then just return .5 in either case
    //number of legendary's of that type that people created in the last 24 hours
    // divided by the number of legendary's of that type that people destroyed
    var elementsCreated;
    var elementsDestroyed;
    var minableElements;
    var circulatingElements;
    var luckBonusPercent = 1.8;

    var chanceCap = .5;
    var destroyBuffer = .2;
    var chance = chanceCap;
    //connect to proton API to determine how many legends of each type are in circulation, vs unmined
    //connect to proton API to determine how many were created and destroyed in the past 24 hours
    var minableRatio = minableElements / circulatingElements + 1 ; //first check supply
    var destroyRatio = 1 + elementsDestroyed / elementsCreated + 1; //the more destroyed, the better the economy flows
    // if more than 50% of the supply is still unmined, or the destroyRatio exceeds 1.2, return the max value of .5
    if (minableRatio > chanceCap || destroyRatio > (1 + destroyBuffer)) //50% of minable supply vs 20% buffer on top of 1:1 destroyRatio
        chance = chanceCap; //50% chance of making an element is as high as we allow it to go, so we can return the max
    chance = minableRatio * destroyRatio * 2;
    if (chance > chanceCap)
        chance = chanceCap //if chance greater than 50% cap, return 50%


    //amount of luck you have, divided by 10
    //ex .1 = .1/.1;
    //.1 * 1 = .1
    // 3 = .3/.1;
    //3 * .577 = 
    //example values
    // 150% luck bonus
    // 

    //luckMulti = luckBonusPercent/.1; 
    if (luckBonusPercent > 1)
    {
        var bonus = (Math.pow(luckBonusPercent, 2)-1) / (Math.pow(luckBonusPercent, 2)+1)
        var bonus = 1 + bonus; // to make the percent back into a multiplier
        chance = chance + bonus;
    }
    return chance; 

}
var CalcLuckBonus = function()
{
    return
}
