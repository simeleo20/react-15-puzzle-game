function Cell({
  value, x, y, onClick
}:{
  value:(number | null), x:number, y:number, onClick:(x:number,y:number)=>void
}) {
  return (
    <div className='cell' onClick={()=>onClick(x,y)}>
      {value}
    </div>
  )
}

export default Cell;