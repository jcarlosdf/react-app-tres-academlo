import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./Components/Cards";
import useFetch from "./CustomHooks/useFetch";
// import { BiSearchAlt2 } from 'react-icons/fa';

const url = `https://rickandmortyapi.com/api/location`

function App() {
  const [search,  setSearch] = useState()
  useEffect(()=>{
    if(search){
      response = search
      console.log(response)
    }
  })
  const randomNumber = Math.floor(Math.random() * 20)
  // const [location, setLocation] = useState();
  
  let response = useFetch(url)
  
  const location = response?.results[randomNumber]
  const population = location?.residents.length
  // const population = 0
  const characters = location?.residents

  const handleNewLocation = () =>{
    const searchValue = document.getElementById("search").value
    // if(search.value !=)
    console.log(searchValue)
    fetch(url+`?name=${searchValue}`)
    .then(resp=>resp.json())
    .then(res=>{
      console.log(res)
      setSearch(res)
    })
    .catch(err=>console.error(err))
  }
  console.log(randomNumber)
  console.log(response?.results[randomNumber])
  return (
    <div className="App">
      <div className="container">
        <div className="poster">
          <img src="../public/Rick-Morty-poster.png" alt="" />
        </div>
        <div className="dataInput">
          <label htmlFor="search">Search</label>
          <input type="text" id="search" placeholder="Type a location ID" list="suggestions"/>
          <button className="btn" onClick={handleNewLocation}>search</button>
        </div>
          <ul id="suggestions">

          </ul>
        <div className="headerCard">
          <div className="titleName">
            <p>
              <span>{"Name: "}</span>
              {location?.name}
            </p>
          </div>
          <div className="titleDescription">
            <p>
              <span>{"Type: "}</span>
              {location?.type}
            </p>

            <p>
              <span>{"Dimension: "}</span>
              {location?.dimension}
            </p>

            <p>
              <span>{"Population: "}</span>
              {population}
            </p>
          </div>
        </div>
        <div className="bodyCard">
        {
          population == 0 ?
          <div  className="card" style={{color:"white",margin:"100px 40%"}}>No results</div>
          :
          characters?.map((character, i)=>(
            <Cards key={i} resident={character}/>        
          ))
        }

        <div className="footerCard">
          <div className="pagination">
            <div className="btns">
              <button className="btn">{"<<"}</button>
              <button className="btn">{"<"}</button>
              <div className="pages">
                <button className="btn btnCurrentPage">{"1"}</button>
                <button className="btn">{"2"}</button>
                <button className="btn">{"3"}</button>
              </div>
              <button className="btn">{">"}</button>
              <button className="btn">{">>"}</button>
            </div>
          </div>
        </div>
      </div>

        <div className="containerFooter">
          <div>

          Footer
          </div>
        </div>
    </div>
    </div>
    
  );
}

export default App;
