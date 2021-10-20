
import {Provider} from 'react-redux'
import store from './store/store'
import Books from './component/Books'
import SingleBook from './component/SingleBook'
import FormBook from './component/FormBook'
import EditBookForm from './component/EditBookForm'
import UploadImage from './component/UploadImage'
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
              <Route exact path="/edit/book/:id" component={EditBookForm} />
              <Route exact path="/upload/image/:id" component={UploadImage} />
            </Switch>
          </Router>
      </Provider>
    </>
  );
}

export default App;
