import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Cell from './components/Cell';

const size = 4;
const randomizerPassages = 200
const dirs = [size, -size, 1, -1]

function App() {
  const [cells, setCells] = useState(Array.from({ length: size }, () => Array(size).fill("")))
  const currentEmpty = useMemo(findEmptyPosition,cells);

  function pickSwitchCell(switch1: number) {
    let switch2: number;
    let dir: number; 
    do {
      dir = dirs[Math.floor(Math.random()*(4))];
      switch2 = switch1 + dir;
    } while (
      switch2 >= size * size ||
      switch2 < 0 ||
      (switch1 % size === 3 && dir === 1) ||
      (switch1 % size === 0 && dir === -1)
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
    const newCells = Array.from({ length: size }, () => Array(size).fill(""));
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
    if(flag===0)
    {
      alert("hai vinto");
    }
  }
  function onCellClick(x:number,y:number)
  {
    
    const newCells= cells.map(row => [...row]);
    if(x===currentEmpty.x)
    {
      if(y<currentEmpty.y) //downward
      {
        for(let i = currentEmpty.y;i>y;i--)
        {
          newCells[i][x]=cells[i-1][x];
        }
      }
      if(y>currentEmpty.y)//upward
      {
        for(let i = currentEmpty.y;i<y;i++)
          {
            newCells[i][x]=cells[i+1][x];
          }
      }
      newCells[y][x]=size*size;
      setCells(newCells);
      checkVictory(newCells);
      
    }
    else if(y===currentEmpty.y)
    {
      if(x<currentEmpty.x) //to the right
      {
        for(let i = currentEmpty.x;i>x;i--)
        {
          newCells[y][i]=cells[y][i-1];
        }
      }
      if(x>currentEmpty.x)//to the left
      {
        for(let i = currentEmpty.x;i<x;i++)
          {
            newCells[y][i]=cells[y][i+1];
          }
      }
      newCells[y][x]=size*size;
      setCells(newCells);
      checkVictory(newCells);
    }
  }

  function findEmptyPosition()
  {
    for(let y=0;y<size;y++)
    {
      for(let x=0;x<size;x++)
      {
        if(cells[y][x]===size*size)
        {
          return {x:x, y:y};
        }
      }
    }
    return {x:null,y:null};
  }
  
  useEffect(() => {
    const numbers = randomizeNumbers();
    setBoard(numbers);
  }, []);

  return (
    <div className='board'>
      {
        [...Array(size)].map((_, yIndex) =>(
          <div className='board-row' key={yIndex}>
            {[...Array(size)].map((_, xIndex) => {
              const currentValue = cells[yIndex][xIndex];
              return(
                <Cell
                  key={xIndex}
                  value={currentValue < size*size ? currentValue: null}
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
