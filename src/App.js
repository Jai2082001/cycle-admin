import './App.css';
import Admin from './components/Admin/Admin';
import { useState } from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Login from './components/Login/Login';
import { useCookies } from 'react-cookie';

function App() {

  console.log(process.env.REACT_APP_FETCH_LINK)

  const [secured, changeSecured] = useState(false)
  const [user, changeUser] = useState({post: 'admin'});
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/login'></Redirect>
        </Route>
        <Route path='/login'>
          <Login secured={secured} user={user} changeUser={changeUser} changeSecured={changeSecured}></Login>
        </Route>
        <Route path='/adminPanel'>
            <Admin secured={secured} changeSecured={changeSecured} user={user}></Admin>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
