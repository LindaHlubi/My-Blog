import React from "react";
import "../scss/home.scss";
import Landing from "../components/Landing";
import Navbar from "../components/Navbar";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Subscription from "../components/Subscription";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <>
      <Landing />
      <Navbar />
      <div className="homeContent">
        <section className="description">
          <h2>A Free Spirit Living </h2>

          
        </section>
       
       

       
        <Subscription />
      </div>
      <Footer />
    </>
  );
};

export default Home;
