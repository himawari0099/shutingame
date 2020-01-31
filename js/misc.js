//譏溘け繝ｩ繧ｹ
class Star
{
	constructor()
	{
		this.x  = rand(0,FIELD_W)<<8;
		this.y  = rand(0,FIELD_H)<<8;
		this.vx = 0;
		this.vy = rand(100,300);
		this.sz = rand(1,2);
	}
	
	draw()
	{
		let x=this.x>>8;
		let y=this.y>>8;
		
		if( x<camera_x || x>=camera_x+SCREEN_W 
			|| y<camera_y || y>=camera_y+SCREEN_H )return;
		
		vcon.fillStyle=rand(0,2)!=0?"#66f":"#aef";
		vcon.fillRect(x,y,this.sz,this.sz);
		
	}
	
	update()
	{
		this.x += this.vx * starSpeed/100;
		this.y += this.vy * starSpeed/100;
		if( this.y>FIELD_H<<8 )
		{
			this.y=0;
			this.x=rand(0,FIELD_W)<<8;
		}
	}
	
}


//繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ縺ｮ繝吶�繧ｹ繧ｯ繝ｩ繧ｹ
class CharaBase
{
	constructor( snum, x,y, vx,vy )
	{
		this.sn    = snum;
		this.x     = x;
		this.y     = y;
		this.vx    = vx;
		this.vy    = vy;
		this.kill  = false;
		this.count = 0;
	}
	
	update()
	{
		this.count++;
		
		this.x += this.vx;
		this.y += this.vy;
		
		if( this.x+(100<<8)<0 || this.x-(100<<8) >FIELD_W<<8 
				|| this.y+(100<<8)<0 || this.y-(100<<8)>FIELD_H<<8 )this.kill = true;
	}
	
	draw()
	{
		drawSprite( this.sn, this.x , this.y );
	}
}

//繧｢繧､繝�Β縺ｮ繧ｯ繝ｩ繧ｹ
class Item extends CharaBase
{
	
}



//辷�匱縺ｮ繧ｯ繝ｩ繧ｹ
class Expl extends CharaBase
{
	constructor( c,x,y,vx,vy )
	{
		super(0,x,y,vx,vy);
		this.timer = c;
	}
	update()
	{
		if(this.timer)
		{
			this.timer--;
			return;
		}
		super.update();
	}
	draw()
	{
		if(this.timer)return;
		this.sn = 16 + (this.count>>2);
		if( this.sn==27 )
		{
			this.kill = true;
			return;
		}
		super.draw();
	}
}

//繧ゅ▲縺ｨ豢ｾ謇九↑辷�匱
function explosion( x,y, vx,vy )
{
	expl.push( new Expl( 0,x,y,vx,vy ) );
	for(let i=0;i<10;i++)
	{
		let evx = vx+(rand(-10,10)<<6);
		let evy = vy+(rand(-10,10)<<6);
		expl.push( new Expl( i,x,y,evx,evy ) );
	}
}


//繧ｭ繝ｼ繝懊�繝峨′謚ｼ縺輔ｌ縺溘→縺�
document.onkeydown = function(e)
{
	key[ e.keyCode ] = true;
	if( gameOver && e.keyCode==82 )
	{
		delete jiki;
		jiki = new Jiki();
		gameOver=false;
		score = 0;
	}
	if(e.keyCode==82||e.keyCode==116)return true;
	return false;
}

//繧ｭ繝ｼ繝懊�繝峨′髮｢縺輔ｌ縺溘→縺�
document.onkeyup = function(e)
{
	key[ e.keyCode ] = false;
}

//繧ｹ繝励Λ繧､繝医ｒ謠冗判縺吶ｋ
function drawSprite( snum, x, y )
{
	let sx = sprite[snum].x;
	let sy = sprite[snum].y;
	let sw = sprite[snum].w;
	let sh = sprite[snum].h;
	
	let px = (x>>8) - sw/2;
	let py = (y>>8) - sh/2;
	
	if( px+sw <camera_x || px >=camera_x+SCREEN_W 
			|| py+sh <camera_y || py >=camera_y+SCREEN_H )return;
	
	vcon.drawImage( spriteImage,sx,sy,sw,sh,px,py,sw,sh);
}


//謨ｴ謨ｰ縺ｮ繝ｩ繝ｳ繝繝�繧剃ｽ懊ｋ
function rand(min,max)
{
	return Math.floor( Math.random()*(max-min+1) )+min;
}

//蠖薙◆繧雁愛螳�
function checkHit( x1,y1,r1,  x2,y2,r2 )
{
	// 蜀�酔螢ｫ縺ｮ蠖薙◆繧雁愛螳�
	
	let a = (x2-x1)>>8;
	let b = (y2-y1)>>8;
	let r = r1+r2;
	
	return r*r >= a*a + b*b ;
	
	//遏ｩ蠖｢蜷悟｣ｫ縺ｮ蠖薙◆繧雁愛螳�
	
	/*
	let left1   = x1>>8;
	let right1  = left1+w1;
	let top1    = y1>>8;
	let bottom1 = top1 +h1;
	
	let left2   = x2>>8;
	let right2  = left2+w2;
	let top2    = y2>>8;
	let bottom2 = top2 +h2;
	
	return (  left1 <= right2 &&
			right1 >= left2  &&
			  top1 <= bottom2 &&
	   	bottom1 >= top2 );
	*/
	
	
}