/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

const SECURIRY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, disPatch] = React.useReducer(reducer, initialState);
  const onConfirm = () => { disPatch({ type: actionTypes.confirm }) };
  const onError = () => { disPatch({ type: actionTypes.error }) };
  const onCheck = () => { disPatch({ type: actionTypes.check }) };
  const onDelete = () => { disPatch({ type: actionTypes.delete }) };
  const onReset = () => { disPatch({ type: actionTypes.reset }) };

  const onWrite = ({ target: { value} }) => {
    disPatch({ type: actionTypes.write, payload: value })
  };

  React.useEffect(() => {

    if(!!state.loading) {
      setTimeout(() => {

        if (state.value === SECURIRY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 3000)
    }

  } , [state.loading, state.value])

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        
        <p>Por favor, escribe el código de seguridad.</p>
  
        {(state.error && !state.loading) && (
          
          <p>Error: el código es incorrecto</p>
        )}
  
        {state.loading && (
          <p>Cargando...</p>
        )}
  
        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={onWrite}
          />
        <button
          onClick={onCheck}
          >Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>¿Seguros que quieres eliminar?</p>
        <button 
          onClick={onDelete}
        >
          Sí, eliminar</button>
        <button
          onClick={onReset}
        >
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button
          onClick={onReset}
        >
          ¿Quieres volver atrás?
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
}

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
      ...state,
      error: true,
      loading: false,
    },
    [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  }
  })

  const reducer = (state, action) => {
    if(reducerObject(state)[action.type]) {
      return reducerObject(action.payload)[action.type];
    } else {
      return state;
    }
  }

  export { UseReducer };
