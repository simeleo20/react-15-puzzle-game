import { useState, useEffect } from 'react'
import './App.css'
import Cell from './components/Cell';

const size = 4;
const randomizerPassages = 200
const dirs = [size, -size, 1, -1]

function App() {
  const [cells, setCells] = useState(Array(size).fill(Array(size).fill("")))
  const [currentEmpty, setCurrentEmpty] = useState<{x:number,y:number}>({});

  function pickSwitchCell(switch1: number) {
    let switch2: number;
    let dir: number; 
    do {
      dir = dirs[Math.floor(Math.random()*(4))];
      switch2 = switch1 + dir;
    } while (
      switch2 >= size * size ||
      switch2 < 0 ||
      (switch1 % size == 3 && dir == 1) ||
      (switch1 % size == 0 && dir == -1)
    );   
    
    return switch2
  }

  function randomizeNumbers() {
    const newNumbers = Array(size*size).fill(0).map((_, i) => i+1);

    let emptyCellIndex = size * size - 1;

    for (let i = 0; i < randomizerPassages; i++) {
      const switch2 = pickSwitchCell(emptyCellIndex);

      newNumbers[emptyCellIndex] = newNumbers[switch2];
      newNumbers[switch2] = size * size;
      emptyCellIndex = switch2;
    }
    return newNumbers
  }

  function setBoard(numbers: Array<number>) {
    const newCells = Array(size).fill(Array(size).fill(""));
    let i=0;
    for(let y=0; y < size; y++) {
      for(let x=0; x < size; x++) {
        newCells[y][x] = numbers[i];
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
    const newCells= cells.map(row => [...row]);
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
  
  useEffect(() => {
    const numbers = randomizeNumbers();
    setBoard(numbers);
  }, []);

  return (
    <div className='board'>
      {
        [...Array(size)].map((_, yIndex) =>(
          <div className='board-row'>
            {[...Array(size)].map((_, xIndex) => {
              const currentValue = cells[yIndex][xIndex];
              return(
                <Cell
                  key={xIndex + '-' + yIndex}
                  value={currentValue < 16 ? currentValue: null}
                  x={xIndex}
                  y={yIndex}
                  onClick={onCellClick}
                />
              )
            })}
          </div>
        ))
      }
    </div>
  )

}

export default App;
