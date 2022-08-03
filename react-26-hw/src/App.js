import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <Router>
          <Routes>
            <Route exact path='/sign-in' element={<SignIn />}></Route>
            <Route exact path="/" element={ <Navigate to="/sign-in" /> }></Route>
            <Route exact path='/sign-up' element={<SignUp />}></Route>
            <Route exact path='/:username' element={<WelcomePage />}></Route>
          </Routes>
    </Router>
  );
}

export default App;
