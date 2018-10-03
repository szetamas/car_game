///it is just random numbers generator
function rando(a)
{
		return Math.floor(Math.random()*a);
}

///this is object constructor with id(it is css #id)
///and sav that is mean the object location(path) in the road
function objektum(id, sav, tempo){
    this.id=id;
    this.sav=sav;
    this.goDown=function(fromY, toY, tempo)
    {
		//i need a random path
		whichSav=rando(3)+1;
		//and go on 1 of these paths
		switch(whichSav)
		{
			case 1:
				//go to the begin of first path
				this.spawn(1,100,fromY);
				break;
			case 2:
				this.spawn(2,250,fromY);
				break;
			case 3:
				this.spawn(3,400,fromY);
				break;
		}
		//and go to this path to y
		$("#"+this.id).animate({top: toY+"px"}, tempo, "linear");
	};

    this.spawn=function(toSav, x, y)
    {
		//take to the path
		this.sav=toSav
		//and go to coord
		$("#"+this.id).offset({left:x,top:y});		
	};

	this.move=function(toSav, tempo)
	{
		//check that actual path(sav) + move(left or right 1 path) it is 1. 2. or 3. path
		switch(this.sav+toSav)
		{
			case 1:
				//go to the first path
				$("#"+this.id).animate({left: "100px"}, tempo);
				//and change the path value
				this.sav=this.sav+toSav;
				break;
			case 2:
				$("#"+this.id).animate({left: "250px"}, tempo);
				this.sav=this.sav+toSav;
				break;
			case 3:
				$("#"+this.id).animate({left: "400px"}, tempo);
				this.sav=this.sav+toSav;
				break;
		}	
	};
}

$(document).ready(function()
{	
	//i create a car into the first path
	car = new objektum("car",1);
	//and create an other car
	ancar = new objektum("ancar0",1);
	//start the driving 
	setInterval("ancar.goDown(-282,800,1500)", 1600);
	
	//TODO: I NEED HIT CHEKING METHOD
	
	$("body").keydown(function(event)
	{	
		if(event.which==37)		//LEFT
		{
			//if the keydown is 37 keycode(left), then goto left with move method
			car.move(-1,80);
		}
		if(event.which==39)		//RIGHT
		{
			//if the keydown is 39 keycode(right), then goto right with move method
			car.move(1,80);
		}
    });
	
	
}); 