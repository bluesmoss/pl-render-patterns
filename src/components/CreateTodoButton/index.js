import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {

  const  onClickFunction = (msg) => {
    props.setOpenModal(!props.openModal)
  }

  return (
    <button 
      className="CreateTodoButton"
      onClick={
        () => onClickFunction()
      }
    >
      +
      </button>
  );
}

export { CreateTodoButton };
