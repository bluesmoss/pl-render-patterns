import React from "react";

function useLocalStorage(itemName, initialValue) {

    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [item, setItem] = React.useState(initialValue);
    const [synchronized, setSynchronized] = React.useState(true)

    React.useEffect( ()=>{
      setTimeout(() => {
        try{
          const localStorageItem = localStorage.getItem(itemName)
          let parsedItem;
          
          if(!localStorageItem){
            localStorage.setItem(itemName, JSON.stringify(initialValue))
            parsedItem = []
          } else {
            parsedItem = JSON.parse(localStorageItem)
          }
    
          setItem(parsedItem)
          setLoading(false)
          setSynchronized(true)
    
        } catch (error) {
          setError(error)
        }
      }, 2000)
    }, [synchronized])
  
  
  
  
    const saveItem = (newItem) => {
      try{
        localStorage.setItem(itemName, JSON.stringify(newItem))
        setItem(newItem)      
      } catch(error){
        setError(error)
      }
    }

    const synchronize = () =>{
      setLoading(true);
      setSynchronized(false);

    }
  
    return {
      item,
      saveItem,
      loading,
      error,
      synchronize
    }
    
  }  


  export {useLocalStorage}