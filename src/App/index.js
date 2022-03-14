import React, {useState} from 'react';
import { useTodos } from './useTodos'
import { TodoCounter } from '../components/TodoCounter';
import { TodoSearch } from '../components/TodoSearch';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { CreateTodoButton } from  '../components/CreateTodoButton'
import { Modal } from '../components/Modal'
import { TodoForm } from '../components/TodoForm'
import { TodoHeader } from "../components/TodoHeader";


function App() {


  const { 
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos, 
    completedTodos,
    searchValue, 
    setSearchValue,
    addTodo} =useTodos()

    return (
      <React.Fragment>
      <TodoHeader>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue}/>      
      </TodoHeader>

      <TodoList>
          {error && <p>Hubo un error....</p>}
          {loading && <p>Loading....</p>}
          {(!loading && !searchedTodos.length) && <p>Creat tu primer todo</p>}

          {searchedTodos.map(todo => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={()=> deleteTodo(todo.text)}
            />
          ))}
      </TodoList>

      { !!openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal}/>
        </Modal>
      )}


      <CreateTodoButton
        setOpenModal = {setOpenModal}
      />
    </React.Fragment>
  )
}

export default App;
