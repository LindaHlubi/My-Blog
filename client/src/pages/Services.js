import React from "react";
import Hero from "../components/Hero";
import servicesImg from "../images/services.png";
import ServicesCard from "../components/ServicesCard";
import wedding from "../images/wedding8.jpg";
import portrait from "../images/portrait6.jpg";
import fashion from "../images/fashion1.jpg";
import custom from "../images/branding5.jpg";
import landscape from "../images/landscape1.jpg";
import promotion from "../images/branding8.jpg";

const Services = () => {
  return (
    <section className="services">
      <Hero image={servicesImg} heroTitle="Services" />
      <div className="servicesContent">
        <ServicesCard
          image={wedding}
          serviceTitle="Wedding"
          serviceNumber="01"
          serviceContentList={[
            "Timeframes",
            "Customizable",
            "Style",
            "Specify equipment needed"
          ]}
        />
        <ServicesCard
          image={fashion}
          serviceTitle="Fashion"
          serviceNumber="02"
          serviceContentList={[
            "Timeframes",
            "Customizable",
            "Style",
            "Specify equipment needed"
          ]}
        />
        <ServicesCard
          image={portrait}
          serviceTitle="Portraits"
          serviceNumber="03"
          serviceContentList={[
            "Timeframes",
            "Customizable",
            "Style",
            "Specify equipment needed"
          ]}
        />
        <ServicesCard
          image={landscape}
          serviceTitle="Landscapes"
          serviceNumber="04"
          serviceContentList={[
            "Timeframes",
            "Customizable",
            "Style",
            "Specify equipment needed"
          ]}
        />
        <ServicesCard
          image={promotion}
          serviceTitle="Promotions"
          serviceNumber="05"
          serviceContentList={[
            "Timeframes",
            "Customizable",
            "Style",
            "Specify equipment needed"
          ]}
        />
        <ServicesCard
          image={custom}
          serviceTitle="Customized Events"
          serviceNumber="06"
          serviceContentParagraph="We strive to accommodate all event needs. Please advise us with sufficient time"
        />
      </div>
    </section>
  );
};

export default Services;
