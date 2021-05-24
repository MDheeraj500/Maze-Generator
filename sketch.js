var cols,rows;
var w=10;
var grid=[];

var stack=[];

var current;


function setup()
 {
  createCanvas(750,750);
    cols=floor(width/w);
    rows=floor(height/w);
    frameRate(100);

    for(i=0;i<rows;i++)
    {
        for(j=0;j<cols;j++)
        {
          var cell=new Cell(i,j);
          grid.push(cell);
        }
    }
    current=grid[0];
}

function draw() 
{
  
  background(51);

  for(i=0;i<grid.length;i++)
  {
      grid[i].show();
  }
  current.visited = true;
  current.highlight();
  var next=current.checkNeighbors();
  //next.change();
  if(next)
  {
    stack.push(current);
    // next.change();
    next.visited=true;
    removeWalls(current,next);
    current=next;
  }
  else if(stack.length>0)
  {
    current = stack.pop();
    //current.change();
    
  }
}


function index(i,j)
{
  if(i<0 || j<0 || i>rows-1 || j>cols-1)
  {
    return -1;
  }
  return j+(i*cols);
}


function Cell(i,j)
{
    this.i=i;
    this.j=j;
    this.walls=[true,true,true,true];
    this.visited=false;

    // this.change=function()
    // {
    //   var x = j*w;
    //   var y = i*w

    //   noStroke();
    //   fill(255,0,0,100);
    //   rect(x,y,w,w);
    // }

    this.highlight=function()
    {
      var x=j*w;
      var y=i*w;

      noStroke();
      fill(0,0,255,100);
      rect(x,y,w,w);
      
    }

    this.checkNeighbors= function()
    {
      var neighbors=[];

      var top=grid[index(i,j-1)];
      var right=grid[index(i+1,j)];
      var bottom=grid[index(i,j+1)];
      var left=grid[index(i-1,j)];

      
      if(top && !top.visited)
      {
        neighbors.push(top);
      }
      if(right && !right.visited)
      {
        neighbors.push(right);
      }
      if(bottom && !bottom.visited)
      {
        neighbors.push(bottom);
      }
      if(left && !left.visited)
      {
        neighbors.push(left);
      }

      if(neighbors.length > 0)
      {
        var r =floor(random(0,neighbors.length));

        return neighbors[r];
      }
      else
      {
        return undefined
      }

    }

    this.show= function()
    {
        var x=j*w;
        var y=i*w;
        stroke(255);
        if(this.walls[0]){
        line(x,y,x+w,y);
        }

        if(this.walls[1]){
        line(x+w,y,x+w,y+w);
        }

        if(this.walls[2]){
        line(x+w,y+w,x,y+w);
        }

        if(this.walls[3]){
        line(x,y+w,x,y);
        }
        if(this.visited)
        {
          noStroke();
          fill(255,0,255,100);
          rect(x,y,w,w);
        }
    }

}

function removeWalls(current,next)
{
  var x=current.j-next.j;
  if(x === 1)
  {
    current.walls[3]=false;
    next.walls[1]=false;
  }
  else if(x===-1)
  {
    current.walls[1]=false;
    next.walls[3]=false;
  }
  var y=current.i-next.i;
  if(y === 1)
  {
    current.walls[0]=false;
    next.walls[2]=false;
  }
  else if(y === -1)
  {
    current.walls[2]=false;
    next.walls[0]=false;
  }
}