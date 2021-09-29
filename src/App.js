import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import logo from './img/logo.png';
import SigninForm from './components/SigninForm';
import AddHeroForm from "./components/AddHeroForm";
import NavBar from './components/NavBar';
import Team from "./components/Team";
import './App.css';
import { useSelector } from 'react-redux';

function App() {

  const logoComp = <img className='img-fluid mt-4 w-50' style={{ maxWidth: '30rem' }} src={logo} alt='SuperHero team picker' />;

  let isSignedIn = useSelector(state => state.forms.isSignedIn);
  //Validamos si se encuentra logueado
  let token = isSignedIn ? localStorage.getItem('token') : '';

  return (
    token
      ?
      <Router>
        <NavBar />
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/addHero" />} />
            <Route exact path="/superhero_team" render={() => <Redirect to="/addHero" />} />
            <Route path="/addHero">
              {logoComp} <AddHeroForm />
            </Route>
            <Route path="/team">
              {logoComp} <Team />
            </Route>
          </Switch>
        </div>
      </Router>
      :
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {logoComp} <SigninForm />
      </div>
  );
}

export default App;
