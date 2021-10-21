
import {Provider} from 'react-redux'
import './index.css'
import store from './store/store'
import Books from './component/Books'
import SingleBook from './component/SingleBook'
import FormBook from './component/FormBook'
import EditBookForm from './component/EditBookForm'
import UploadImage from './component/UploadImage'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



const theme = createTheme({
  palette: {
    primary :{
      light: '#ff8e8c',
      main: '#ff5a5f',
      dark: '#c62035',
      contrastText: '#fff'
    },
    secondary: {
      light: '#4da9b7',
      main: '#333',
      dark: '#004e5a',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  }
})

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
    </>
  );
}

export default App;
