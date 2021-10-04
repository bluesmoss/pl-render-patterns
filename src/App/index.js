import React from 'react';
import { AppUI } from './AppUI';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Llorar con la llorona', completed: false },
//   { text: 'LALALALAA', completed: true },
// ];


function useLocalStorage(itemName, initialValue) {

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [item, setItem] = React.useState(initialValue);

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
  
      } catch (error) {
        setError(error)
      }
    }, 1000)
  })




  const saveItem = (newItem) => {
    try{
      localStorage.setItem(itemName, JSON.stringify(newItem))
      setItem(newItem)      
    } catch(error){
      setError(error)
    }
  }

  return {
    item,
    saveItem,
    loading,
    error
  }
  
}


function App() {


  const {item: todos, saveItem:saveTodos, loading, error} = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = React.useState('')
  
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = []

  if(!searchValue.length >= 1){
    searchedTodos = todos
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
     
      return todoText.includes(searchText);
    })
    
  }



  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text)
    const newTodos = [...todos]
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos)
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text)
    const newTodos = [...todos]
    newTodos.splice(todoIndex,1)
    saveTodos(newTodos)
  }  

  // console.log('Render antes se effects');
  
  // React.useEffect(()=> {
  //   console.log('use effects');
  // }, [totalTodos])

  // console.log('Render despues de use effects');


  return (
    <AppUI 
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
      loading={loading}
      error= {error}
    />
  );
}

export default App;
