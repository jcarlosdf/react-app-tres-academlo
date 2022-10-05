import { useState, useEffect } from 'react'

const useFetch = (url) => {

    const [response, setResponse] = useState()

    useEffect(() => {
      fetch(url)
      .then(resp=>{
        if(resp.ok){
            return resp.json()
        }
        throw new Error ("Url no valida")
      })
      .then(response=>setResponse(response))
      .catch(error=>console.error(error))
      
    }, [])
    

    return response
}

export default useFetch