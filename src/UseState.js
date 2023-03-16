/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

const SECURIRY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  })

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    })
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    })
  }

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    })
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  }

  const onAvoid = () => {
    setState({
      ...state,
      deleted: true,
    })
  }

  const onWhatHappened = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    })
  }

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

  } , [onConfirm, onError, state, state.loading, state.value])

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
          onChange={(e) => {
            onWrite(e.target.value);
          }}
          />
        <button
          onClick={() => {
            onCheck();
          }}
          >Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>¿Seguros que quieres eliminar?</p>
        <button 
          onClick={() => {
            onAvoid();
          }}
        >
          Sí, eliminar</button>
        <button
          onClick={() => {
            onWhatHappened();
          }}
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
          onClick={() => {
            onWhatHappened();
          }}
        >
          ¿Quieres volver atrás?
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };