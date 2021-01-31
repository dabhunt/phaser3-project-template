export default class bonus
{
    constructor(name, amount)
    {
		this.name = name;
        this.amount = amount;
    }
    get Name()
	{
		return this.name;
    }
    get Amount()
	{
		return this.amount;
    }
}