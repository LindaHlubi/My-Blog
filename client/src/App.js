import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import fontAwesomeConfig from "./config/fontAwesomeConfig";
import Home from "./pages/Home";

import Error from "./pages/Error";
import Dashboard from "./components/Admin/Dashboard";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/routeLayout/PrivateRoute";
import PublicLayout from "./components/routeLayout/PublicLayout";
import BlogContextProvider from "./context/BlogContext";

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <BlogContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/admin/dashboard" component={Dashboard} />
              <Route component={PublicLayout} />
              <Route component={Error} /> {/*not working*/}
            </Switch>
          </Router>
        </BlogContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
