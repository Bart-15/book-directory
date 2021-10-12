
import {Provider} from 'react-redux'
import store from './store/store'
import Books from './component/Books'
import SingleBook from './component/SingleBook'
import FormBook from './component/FormBook'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <>
      <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={Books} />
              <Route exact path="/book/details/:id" component={SingleBook} />
              <Route exact path="/add-book" component={FormBook}/>
            </Switch>
          </Router>
      </Provider>
    </>
  );
}

export default App;
