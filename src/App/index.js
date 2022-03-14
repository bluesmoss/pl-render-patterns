import React, {useState} from 'react';
import { AppUI } from './AppUI';
import { TodoProvider } from '../TodoContext'
//import { TodoCounter } from '../components/TodoCounter';


function App(){

  const [state, setState] = useState('shared state')

  return <>
    <TodoHeader>
      <TodoCounter/>
      <TodoSearch/>
    </TodoHeader>
    <TodoList>
      <TodoItem state={state}/>
    </TodoList>
  </>
}

function TodoHeader({children}){
  return <header>
    {children}
  </header>
}

function TodoList({children}){
  return <section className='TodoList-container'>
    {children}
  </section>
}

function TodoCounter(){
  return <p>TodoCounter</p>
}

function TodoSearch(){
  return <p>TodoSearch</p>
}

function TodoItem({state}){
return <p>TodoItem state: {state}</p>
}


// function App() {

//   return (
//     <TodoProvider>
//       <AppUI />
//     </TodoProvider>
    
//   );
// }

export default App;
