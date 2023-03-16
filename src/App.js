import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
import { UseReducer } from './UseReducer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <UseState name="Use State" />
        <UseReducer name="Use Reducer"/>

      </div>
    </div>
  );
}

export default App;
