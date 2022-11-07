import Login from "./pages/login/Login";
import LandingPage from "./pages/landingPage/LandingPage";
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Favorite from "../src/pages/FavoritePage/Favorite"
import { Context } from "./context/Context";
import LoaderAnimation from "./pages/bookLoader/BookLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsSelect from "./pages/newsSelect/NewsSelect"
import Search from "./pages/search/Search";

function App() {
  
  const {user}=useContext(Context);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  return (  
    
    
    <Router>
    <Route exact path="/">
    <div>
    {
      loading ? 
      <LoaderAnimation/>
      :
     <div>
     <Register/>
     </div>
    }
    
    </div>
</Route>
   
    <Switch>
    <Route exact path="/register">
   <Register />
</Route>
 <Route path="/login">
 <Login/>
       </Route>
 <Route path="/landingPage">
 <LandingPage/>
       </Route>
 <Route path="/favorite">
 <Favorite/>
       </Route>
 <Route path="/newsSelect">
 <NewsSelect />
       </Route>
 <Route path="/Search">
 <Search />
       </Route>
  </Switch>
  </Router>
   
   
   
  );
}

export default App;
