import './App.css';
import { HashRouter, Routes, Route, Navigate} from "react-router-dom";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <HashRouter basename='/'>
          <Routes>
            <Route exact path='/sign-in' element={<SignIn />}></Route>
            <Route exact path="/" element={ <Navigate to="/sign-in" /> }></Route>
            <Route exact path='/sign-up' element={<SignUp />}></Route>
            <Route exact path='/:username' element={<WelcomePage />}></Route>
          </Routes>
    </HashRouter>
  );
}

export default App;
