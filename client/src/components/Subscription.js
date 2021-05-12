import React from "react";
import "../scss/subscription.scss";

const Subscription = () => {
  return (
    <section className="newsletter">
      <h3>Subscribe</h3>
      <p>
       Hi guys, please subscribe to our website to stay informed on promotions, new blogs and events.
      
      </p>
      <form>
        <label htmlFor="name"></label>
        <input type="text" name="name" placeholder="Name" />
        <label htmlFor="email"></label>
        <input type="text" name="email" placeholder="Email Address" />
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
};

export default Subscription;
