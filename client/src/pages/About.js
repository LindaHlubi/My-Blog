import React from "react";
import Hero from "../components/Hero";
import Title from "../components/Title";

import aboutImg from "../images/about.jpg";
import "../scss/about.scss";

const About = () => {
  return (
    <section className="aboutSection">
      <Hero
        heroTitle="About"
        heroSubtitle="Fusce id euismod nibh, nec tincidunt."
        image={aboutImg}
      />
      <div className="aboutContent">
        <Title title="Where it all started" />
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Etiam porta vestibulum nisi, vel congue sapien rutrum et. Nulla facilisi. Vivamus et tincidunt sem. 
        Duis vulputate bibendum semper. In elementum elit quis accumsan suscipit. Proin varius sodales finibus. 
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam sodales bibendum tristique. 
        Nam scelerisque ipsum ut porttitor mattis. Morbi vitae massa vitae lectus lacinia dapibus. Ut eget volutpat lorem. 
        Vestibulum maximus mi quis est iaculis, nec viverra nunc mollis. Suspendisse laoreet libero erat, nec lacinia eros pharetra vel.
        </p>
        <Title title="Ambitions" />
        <p>
        Cras dictum mi quis massa convallis hendrerit. Ut ultrices velit vitae lacinia lacinia. 
        Mauris hendrerit turpis a erat ultricies, vitae varius dolor rutrum. 
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
        Sed ac tristique dui, at porttitor lacus. Nullam laoreet purus eu tempus malesuada. 
        Nullam velit velit, aliquet eu euismod sed, facilisis in ante. Aenean posuere elit et urna auctor vehicula.
        </p>
        <p>
        Nam sit amet nisl dictum, posuere neque eget, mollis lorem. Proin maximus euismod ullamcorper. 
        Vivamus suscipit tincidunt metus. Fusce tellus est, molestie eget lacus in, posuere pellentesque mi. 
        Sed odio libero, eleifend quis vehicula eget, maximus nec sem. Aenean pulvinar commodo nisi ut cursus.
        Nullam finibus eros augue, ut convallis elit tincidunt non.
        </p>
      </div>
    </section>
  );
};

export default About;
