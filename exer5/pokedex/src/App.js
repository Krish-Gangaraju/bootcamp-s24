import './App.css';
import exam from './1.png'
import sign from './lt.png'
import { useState, useEffect } from 'react';

const API_URL = "https://pokeapi.co/api/v2/pokemon/";


function App() {
  const [index, setIndex] = useState(1) 
  const [data, setData] = useState(getData())
  const [enable, setEnable] = useState(false)
  
  async function getData() {
    try {
      const res = await fetch(API_URL + index);
      const newData = await res.json();

      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    }
  }

  useEffect(() => {
    getData();
  }, [index]);

function getSprite() {
  try {
    return data.sprites.front_default;
  } catch (error) {
    return null;
  }
}

function getTypes() {
  try {
    return data.types.map(type => (
      <li className={type.type.name}>{type.type.name}</li>
    ))
  } catch (error) {
    return <li className="grass">grass</li>
  }
  
}

function handleShiny(event) {
  if (event.key === "s") {
    const image = document.getElementById("sprite")
    try {
      image.src = data.sprites.front_shiny;
      document.removeEventListener("keydown", handleShiny)
    } catch (error) {
      return;
    }
    
  }
}



function InfoMoves() {
  try {
    if (!enable) {
      return (
    <div className='flex justify-evenly'>
        <button className='bg-[#7CFF79] px-6 py-1 text-xl rounded' onClick={ () => setEnable(enable ? false : enable)}>Info</button>
        <button className='bg-[#E8E8E8] px-4 py-1 text-xl rounded' onClick={ () => setEnable(enable ? enable : true)}>Moves</button>
    </div>)
    } else {
      return (
        <div className='flex justify-evenly'>
            <button className='bg-[#E8E8E8] px-6 py-1 text-xl rounded' onClick={ () => setEnable(enable ? false : enable)}>Info</button>
            <button className='bg-[#7CFF79] px-4 py-1 text-xl rounded' onClick={ () => setEnable(enable ? enable : true)}>Moves</button>
        </div>)
    }
  } catch (error) {
    return <div></div>
  }
  
}

function getInfoMoves () {
  try {
    if (!enable) {
      return (
        <ul className='bg-[#E8E8E8] p-5 w-72 h-[365px] mb-7 font-[Inter] overflow-auto'>
              <li className='text-xl'>height: {data.height / 10}</li>
              <li className='text-xl'>weight: {data.weight / 10}</li>
              {data.stats.map(stat => (
                <li className='text-xl'>{stat.stat.name}: {stat.base_stat}</li>
              ))}
        </ul>
      )
    } else {
      return <ul className='bg-[#E8E8E8] p-5 w-72 h-[365px] mb-7 font-[Inter] overflow-auto'>
          {data.moves.map(move => (
          <li className='text-xl'>{move.move.name}</li>
        ))}
      </ul>
    }
  } catch (error) {
    return <div></div>
  }
  
}


document.addEventListener("keydown", handleShiny);
  return (
    <div className="flex flex-col items-center">
      <h1 className='font-bold text-4xl m-9'>Exercise 5 - PokeDex!</h1>
      <div className='flex justify-evenly w-3/4'>
        <div className='flex flex-col justify-evenly'>
          <img className='w-72 border-[3px] border-black m-4' id='sprite' src={getSprite()}></img>
          <div className='text-center w-[17.7rem] border border-black py-1 bg-[#E8E8E8] mb-3 self-center text-xl rounded-md h-[38px]'>{data.name}</div>
          <p className=' font-bold'>Types:</p>
          <ul>
            {getTypes()}
          </ul>
          <div className='flex justify-evenly m-4'>
            <button className='bg-[#E8E8E8] w-24 rounded-md' onClick={() => {
          if (index > 1) setIndex(index - 1);
        }}><img className='w-9 m-auto' src={sign}></img></button>
            <button className='bg-[#E8E8E8] w-24 rounded-md'  onClick={() => {
          setIndex(index + 1);
        }}><img className='rotate-180 w-9 m-auto' src={sign}></img></button>
          </div>
        </div>
        <div className='flex flex-col'>
          <h3 className='font-bold self-center text-2xl mb-6'>{!enable ? "Info" : "Moves"}</h3>
          {getInfoMoves()}
          {InfoMoves()}
        </div>
      </div>
    </div>
  );
}

export default App;