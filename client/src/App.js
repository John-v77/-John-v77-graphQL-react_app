
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Events from './components/events/Events';
import Booking from './components/booking/Booking';
import Auth from './components/auth/Auth';
import NavBar from './components/aux-components/nav/NavBar';
import {UserProviderContext} from './components/aux-components/context/auth-context'

function App() {

  return (
    <div className="App">
      <h1>Welcome</h1>
      <UserProviderContext>

        <NavBar/>
        
        {/* Define all the routes */}
        <Routes>
        {/* !this.state.token && <Redirect from "/" to="auth" exact/> */}
        {/* this.state.token && <Redirect from "/" to="events" exact/> */}
          <Route path='/' element={<Events/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/booking' element={<Booking/>}/>
        </Routes>
      </UserProviderContext>
    </div>
  );
}

export default App;
