import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Customers from "./components/customers/Customers";
import Nav from "./components/layout/Nav";
import AuthContext from "./context/AuthContext";
import ThemeToggle from "./components/ThemeToggle";
//import PostList from "./components/PostList";
import Post from "./components/Post";
import Home from "./components/Home";

function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
    <ThemeToggle/>
      <Nav />
      <Switch>
      <Route exact path="/">
      <Home />
        </Route>
        {loggedIn === false && (
          <>
            <Route path="/auth/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/customer">
              <Customers />
           </Route>
           <Route path="/posts/:id">
             <Post />
           </Route>
           <Route path="/posts">  
           </Route>

          </>
        )}
        
        
      </Switch>
    </BrowserRouter>
  );
}

export default Router;