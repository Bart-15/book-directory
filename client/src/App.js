
import './App.css';
import {Provider} from 'react-redux'
import store from './store/store'
import Books from './component/Books'
function App() {
  return (
    <>
    <Provider store={store}>
    <div className="App">
     <h1>Hello po hehehe</h1>
     <Books />
    </div>

    </Provider>

    </>
  );
}

export default App;
