import { useState } from 'react'
import './App.css'

export default function Board() {
  let size = 4;
  const [cells,setCells] = useState(Array(size).fill(Array(size).fill("")))

  const numeri: number[] = [];
  for(let i = 0; i<size*size;i++)
  {
    numeri.push(i);
  }

  return(
    <div className='board'>
      {
        [...Array(size)].map((_, yIndex) =>(
          <div className='board-row'>
            {[...Array(size)].map((_, xIndex) => (
              <Cell value={xIndex}/>
            ))}
          </div>
        ))
      }
    </div>
  )

}

function Cell({value}:{value:number}) {


  return (
    <div className='cell'>
      {value}
    </div>

  )
}


