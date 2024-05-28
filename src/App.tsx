import { useState, useEffect } from 'react'
import './App.css'

export default function Board() {
  
  let size = 4;
  const [cells,setCells] = useState(Array(size).fill(Array(size).fill("")))
  const [currentEmpty, setCurrentEmpty] = useState<{x:number,y:number}>({});
  //const currentEmpty:{x:number,y:number} = {x:0,y:0};
  function randomizeNumeri(){
    let empty:number=15;
    for(let i=0;i<size*size;i++)
    {
      if(numeri[i]==16)
      {
        empty=i;
      }
    }
    for(let i = 0; i<200;i++)
    {
      let switch1 = empty;
      let switch2:number;
      let dir:number; 
      do{
        let dirs = [4,-4,1,-1]
        dir =  dirs[Math.floor(Math.random()*(4))];
        switch2=switch1+dir;
      }while(switch2>=size*size||switch2<0||(switch1%4==3 && dir == 1)||(switch1%4 ==0&& dir==-1));

      
      console.log(numeri,empty);
      
      
      let temp = numeri[switch1];
      numeri[switch1]=numeri[switch2];
      numeri[switch2]=temp;
      empty=switch2;
    }
    console.log(numeri,empty);
  }
  function setBoard()
  {
    let newCells = cells.map(row => [...row]);
    let i=0;
    for(let y=0;y<size;y++)
    {
      for(let x=0;x<size;x++)
      {
        newCells[y][x] = numeri[i];
        if(numeri[i]==16)
        {
          setCurrentEmpty({x:x,y:y})
          console.log(currentEmpty);
        }
        i++;
      }
    }
    
    
    setCells(newCells);
  }
  function checkVictory(newCells:Array<Array<string>>)
  {
    let flag=0;
    let lastValue = newCells[0][0]
    for(let y=0;y<size;y++)
    {
      for(let x=0;x<size;x++)
      {
        if(lastValue>newCells[y][x])
        {
          flag=1;
        }
        lastValue=newCells[y][x];
      }
    }
    if(flag==0)
    {
      alert("hai vinto");
    }
  }
  function onCellClick(x:number,y:number)
  {
    console.log("x: ",x, " y: ",y);
    console.log(currentEmpty)
    let newCells= cells.map(row => [...row]);
    if(x===currentEmpty.x)
    {
      if(y<currentEmpty.y) //verso il basso
      {
        for(let i = currentEmpty.y;i>y;i--)
        {
          newCells[i][x]=cells[i-1][x];
        }
      }
      if(y>currentEmpty.y)//verso l'alto
      {
        for(let i = currentEmpty.y;i<y;i++)
          {
            newCells[i][x]=cells[i+1][x];
          }
      }
      setCurrentEmpty({x:x,y:y});
      newCells[y][x]=16;
      setCells(newCells);
      checkVictory(newCells);
      
    }
    else if(y===currentEmpty.y)
    {
      if(x<currentEmpty.x) //verso destra
      {
        for(let i = currentEmpty.x;i>x;i--)
        {
          newCells[y][i]=cells[y][i-1];
        }
      }
      if(x>currentEmpty.x)//verso sinistra
      {
        for(let i = currentEmpty.x;i<x;i++)
          {
            newCells[y][i]=cells[y][i+1];
          }
      }
      setCurrentEmpty({x:x,y:y});
      newCells[y][x]=16;
      setCells(newCells);
      checkVictory(newCells);
    }
  }
  
  let numeri: number[];
  
  useEffect(() => {
    console.log("inizio");
    numeri = [];
    for(let i = 0; i<size*size;i++)
    {
      numeri.push(i+1);
    }
    randomizeNumeri();
    setBoard();
    
  }, []);

  let i:number=0;
  return(
    <div className='board'>
      {
        [...Array(size)].map((_, yIndex) =>(
          <div className='board-row'>
            {[...Array(size)].map((_, xIndex) => {
              const currentValue = cells[yIndex][xIndex];
              i+=1
              return(<Cell value={currentValue<16 ? currentValue: null} x={xIndex} y= {yIndex} onClick={onCellClick} />)
            })}
          </div>
        ))
      }
    </div>
  )

}

function Cell({value, x, y, onClick}:{value:(number | null), x:number, y:number, onClick:(x:number,y:number)=>void}) {


  return (
    <div className='cell' onClick={()=>onClick(x,y)}>
      {value}
    </div>

  )
}


