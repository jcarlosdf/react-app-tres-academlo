import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./Components/Cards";
// import useFetch from "./CustomHooks/useFetch";
// import { BiSearchAlt2 } from 'react-icons/fa';

const randomNumber = Math.floor(Math.random() * 126)
const url = `https://rickandmortyapi.com/api/location/${randomNumber}` 

function App() {
  // start a hook state with an void object if you want to use as an object later
  // otherwise it get an error for not use the hooks rule correctly
  const [location, setLocation] = useState({})
  
  useEffect(()=>{
    console.log(url)
        
      fetch(url)
      .then(resp=>{
        if(resp.ok){
          return resp.json()
        }else{
          
          throw new Error ("Url no valida")
        }
      })
      .then(response=>setLocation({initLocation: response}))
      .catch(error=>console.error(error))
  // done the use effect hook sending the secong param which is a dependancies array
  // otherwise it get an infinity loop
  },[])

console.log(location)
const newLocation = location.locationID ? location.locationID : location.locationName ? location.locationName.results[0] : location.initLocation

const population = newLocation?.residents.length
const characters = newLocation?.residents
console.log(characters)

const handleSearchLocations = () =>{
  const searchValue = document.getElementById("search").value.trim()
  console.log(searchValue)
  if(searchValue==="") {
    setLocation({searchLocation:0})
    return;
  }
  const url = `https://rickandmortyapi.com/api/location?name=${searchValue}`
  console.log(url)
  // clear cache to re-rendering new searched data till new response get reach
  // setting to zero allow to validate data wiht ternary operation and optional chaining operation
  setLocation({searchLocation:0})
  
    fetch(url)
    .then(resp=>{
      if(resp.ok){
        return resp.json()
      }else{
        
        throw new Error ("Url no valida")
      }
    })
    .then(response=>setLocation({searchLocation:response}))
    .catch(error=>console.error(error))
}

const handleNewLocation = (id, name, search=false) => {
  const searchValue = document.getElementById("search").value.trim()
  console.log(searchValue)
  if(searchValue==="") {
    setLocation({searchLocation:0})
    return;
  }else if(search){
    const url = `https://rickandmortyapi.com/api/location?name=${searchValue}`
    console.log(url)
    setLocation({locationName:0})
    setLocation({locationID:0})
    fetch(url)
    .then(resp=>{
      if(resp.ok){
        return resp.json()
      }else{
        
        throw new Error ("Url no valida")
      }
    })
    .then(response=>setLocation({locationName:response}))
    .catch(error=>console.error(error))
  }

  if(id){
  console.log(id)
  const url = `https://rickandmortyapi.com/api/location/${id}`
  console.log(url)
  
  setLocation({locationID:0})
  setLocation({searchLocation:0})
    fetch(url)
    .then(resp=>{
      if(resp.ok){
        return resp.json()
      }else{
        
        throw new Error ("Url no valida")
      }
    })
    .then(response=>setLocation({locationID:response}))
    .catch(error=>console.error(error))
  }
  document.getElementById("search").value = name
    
}
// console.log(randomNumber)
console.log(newLocation)

  return (
    <div className="App">
      <div className="container">
        <div className="poster">
          <img src="../public/Rick-Morty-poster.png" alt="" />
        </div>
        <div className="dataInput">
          <label htmlFor="search">Search</label>
          <input type="text" id="search" placeholder="Type a location" onChange={handleSearchLocations} onBlur={()=>{setTimeout(()=>setLocation({searchLocation:0}),200)}} />
          {/* onBlur={()=>{setTimeout(()=>setLocation({searchLocation:0}),500)}} */}
          <button className="btn" onClick={()=>{handleNewLocation(null, null, true)}}>search</button>
          <ul id="suggestions" className={location.searchLocation ? "ulSearch" : "ulHidden"}>
            {
            location.searchLocation ? 
            location.searchLocation?.results.map(match=>{
                  console.log(match.name);
                return (<li key={match.name} onClick={()=>{handleNewLocation(match.id,match.name)}}>{match.name}</li>)
            })
              :
              ""
              }
          </ul>
        </div>
        <div className="headerCard">
          <div className="titleName">
            <p>
              <span>{"Name: "}</span>
              {newLocation?.name}
            </p>
          </div>
          <div className="titleDescription">
            <p>
              <span>{"Type: "}</span>
              {newLocation?.type}
            </p>

            <p>
              <span>{"Dimension: "}</span>
              {newLocation?.dimension}
            </p>

            <p>
              <span>{"Population: "}</span>
              {population}
            </p>
          </div>
        </div>
        <div className="bodyCard">
        {
          population == 0 || location.searchLocation ?
          <div  className="card" style={{color:"white",margin:"100px 40%"}}>There is not any characters</div>
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
