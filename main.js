///it is just random numbers generator
function rando(a)
{
		return Math.floor(Math.random()*a);
}

///this is object constructor with id(it is css #id)
///and sav that is mean the object location(path) in the road
///and some method hitCheck(targetObj), check that this obj "hitting" the target
///goDown(fromY, toY, tempo, valtas=false(optional)) an object go to down some speed and that change path is true or false
///spawn(toSav, x, y) take an object into a path and coords
///move(toSav, tempo) move left and right an object (player's car)
function objektum(id, sav, tempo){
    this.id=id;
    this.sav=sav;
    this.hitCheck=function(targetObj)
    {
		//check that this object "hits" the targe tobject
		var targetpos=$("#"+targetObj.id).position();
		var thispos=$("#"+this.id).position();
		//if the 2 object paths are equal and the target top position+target height(282)  more than this top position-20 and target pos less than this+this height-20
		if( targetObj.sav==this.sav && targetpos.top+$("#"+targetObj.id).height()>thispos.top-20 && targetpos.top<thispos.top+$("#"+this.id).height()-20 )
		{
			//stop the animations
			$("#"+this.id).stop();
			$("#"+targetObj.id).stop();
			//stop methods
			clearInterval(dmove);
			clearInterval(hchecking);
			
			//switch on the filter and the menu
			$("img").css("filter", "grayscale(1)");
			$("#divcentrum").css("visibility","visible");
			$("#out2").text("Failed, push enter to restart!");
		}
	}
	
    this.goDown=function(fromY, toY, tempo, valtas=false)
    {
		//i need a random path
		var whichSav=rando(3)+1;
		
		//need a rando 50%(changing the path)
		valte=rando(2);
		
		//and go on 1 of these paths
		switch(whichSav)
		{
			case 1:
				//go to the begin of first path
				this.spawn(1,100,fromY);
				
				if(valtas)
				{
					//if changer variable more than 0 (so he get value), start a path canging later(valtas time)
					//and 50% chance that path is change(because it is first path case)
					if(valte>0)
					{
						//go to down a little and later change the path and go to the bottom 
						$("#"+this.id).animate({top: parseInt(((toY/10)*3)-282)+"px"}, parseInt((tempo/10)*3), "linear");
						$("#"+this.id).animate({top: parseInt(((toY/10)*6)-282)+"px",left: "250px"}, parseInt((tempo/10)*3), "linear");
						$("#"+this.id).animate({top: toY+"px"}, parseInt((tempo/10)*6), "linear");
						//sav will be 2
						this.sav=2;
					}
				
				}
				
				break;
			case 2:
				this.spawn(2,250,fromY);
				if(valtas)
				{
					if(valte>0)
					{
						$("#"+this.id).animate({top: parseInt(((toY/10)*3)-282)+"px"}, parseInt((tempo/10)*3), "linear");
						
						//i need 50-50 random num that chose the side
						if(rando(2)>0)
						{
							//left side
							$("#"+this.id).animate({top: parseInt(((toY/10)*6)-282)+"px",left: "100px"}, parseInt((tempo/10)*3), "linear");
							this.sav=1;
						}
						else
						{
							//right side
							$("#"+this.id).animate({top: parseInt(((toY/10)*6)-282)+"px",left: "400px"}, parseInt((tempo/10)*3), "linear");
							this.sav=3;
						}
						$("#"+this.id).animate({top: toY+"px"}, parseInt((tempo/10)*6), "linear");
					}
				}
				break;
			case 3:	
				this.spawn(3,400,fromY);
				
				if(valtas)
				{
					if(valte>0)
					{
						//goto left
						$("#"+this.id).animate({top: parseInt(((toY/10)*3)-282)+"px"}, parseInt((tempo/10)*3), "linear");
						$("#"+this.id).animate({top: parseInt(((toY/10)*6)-282)+"px",left: "250px"}, parseInt((tempo/10)*3), "linear");
						$("#"+this.id).animate({top: toY+"px"}, parseInt((tempo/10)*6), "linear");
						//sav will be 2
						this.sav=2;
					}
				
				}
				
				break;
		}
		
		if(!valtas || valte==0)
		{
			//if change is not true(so false(so default)) goto down just simple(boost with *1.2 bceause the real mode needs it)
			$("#"+this.id).animate({top: toY+"px"}, tempo*1.2, "linear");
		}
		
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
				//check that it is not an accident
			    this.hitCheck(ancar);
				break;
			case 2:
				$("#"+this.id).animate({left: "250px"}, tempo);
				this.sav=this.sav+toSav;
				this.hitCheck(ancar);
				break;
			case 3:
				$("#"+this.id).animate({left: "400px"}, tempo);
				this.sav=this.sav+toSav;
				this.hitCheck(ancar);
				break;
		}	
	};
}

///this is starting(and initialization method) with game mode, speed and car number
function start(mode,tempo,cars=1)
{
	switch(mode)
		{
			case "traditional":
				
				//i create a car into the first path
				car = new objektum("car",1);
				//and create an other car
				ancar = new objektum("ancar0",1);
				
				//initialiation(take cars to the path and correct x,y coord)
				car.spawn(1,100,500);
				ancar.spawn(1,100,-282);
				
				//switch off the filter and the menu
				$("img").css("filter", "grayscale(0)");
				$("#divcentrum").css("visibility","hidden");
				//body always get an onkeydown attribute
				$("body").attr("onkeydown","if(event.which == 13 && $('img').css('filter') == 'grayscale(1)'){start('traditional','"+tempo+"');}");
				
				//start the driving(paramters:fromy,toy,tempo and optional valtas) setinterval needs more time(because slower the down method because real mode is exist)
				dmove=setInterval("ancar.goDown(-282,800,"+parseInt(tempo)+")", parseInt(tempo*1.2)+100);
				//it checks that the car hit the another car or not
				hchecking=setInterval("car.hitCheck(ancar);", 30);
				
				break;
				
			case "real":
				
				//create cars
				car = new objektum("car",1);
				ancar = new objektum("ancar0",1);
				
				//initialiation
				car.spawn(1,100,500);
				ancar.spawn(1,100,-282);
				
				//off menu
				$("img").css("filter", "grayscale(0)");
				$("#divcentrum").css("visibility","hidden");
				//body get an onkeydown
				$("body").attr("onkeydown","if(event.which == 13 && $('img').css('filter') == 'grayscale(1)'){start('real','"+tempo+"');}");
				
				
				dmove=setInterval("ancar.goDown(-282,800,"+parseInt(tempo)+",true)", parseInt(tempo*1.2)+100);
				hchecking=setInterval("car.hitCheck(ancar);", 30);
				
				
				break;
		}	
}


$(document).ready(function()
{	
	
	$("body").keydown(function(event)
	{	
	
		if( event.which == 37 && $("img").css("filter") == "grayscale(0)" )		//LEFT
		{
			//if the keydown is 37 keycode(left) and the img's doesnt have grayscale, then goto left with move method
			car.move(-1,80);
			
		}
		
		if( event.which == 39 && $("img").css("filter") == "grayscale(0)" )		//RIGHT
		{
			//if the keydown is 39 keycode(right) and the img's doesnt have grayscale, then goto right with move method
			car.move(1,80);
			
		}
		
    });
	
}); 