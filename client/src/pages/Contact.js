import React, { useState } from "react";
import Hero from "../components/Hero";
import contact from "../images/contact.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../scss/contact.scss";
import SuccessModal from "../components/SuccessModal";
import useModal from "../components/hooks/useModal";

const Contact = () => {
  const { isShowing, toggle, setIsShowing } = useModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [hoursNeeded, setHoursNeeded] = useState("");
  const [message, setMessage] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async e => {
    setSending(true);
    e.preventDefault();
    const newForm = {
      name,
      email,
      eventType,
      fromDate,
      toDate,
      hoursNeeded,
      message
    };
    try {
      const res = await axios.post("/form", newForm);
      setSending(false);
      setSuccessMsg(res.data.success);
      toggle();
      clearError();
      clearInput();
    } catch (error) {
      await error.response.data.errors.map(
        err =>
          (err.param === "message" && setMessageErr(err.msg)) ||
          (err.param === "name" && setNameErr(err.msg)) ||
          (err.param === "email" && setEmailErr(err.msg))
      );
    }
  };

  function clearError() {
    setMessageErr("");
    setNameErr("");
    setEmailErr("");
  }
// clears inputs
  function clearInput() {
    setName("");
    setEmail("");
    setMessage("");
    setEventType("");
    setHoursNeeded("");
    setFromDate("");
    setToDate("");
  }
  return (
    <>
      <section className="contactSection">
        <Hero
          image={contact}
          heroTitle="Contact"
          heroSubtitle="If you want to get in contact with us, please feel free to shoot us an email or give us a call.
          If its an inquiry on our services please fill in the contact form below :)"
        />

        {sending && <p className="sending">Sending your message...</p>}
        <div className="content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="name item">
              <label htmlFor="name"></label>
              <input
                type="text"
                name="name"
                required
                className={nameErr ? "hasError" : ""}
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <small className="errorMsg">{nameErr}</small>
            </div>
            <div className="email item">
              <label htmlFor="email"></label>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className={emailErr ? "hasError" : ""}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <small className="errorMsg">{emailErr}</small>
            </div>
            <div className="event-type item select">
              <label htmlFor="eventType"></label>
              <select
                name="eventType"
                id="eventType"
                value={eventType}
                onChange={e => setEventType(e.target.value)}
              >
                <option disabled className="text-hide" value="">
                  Event Type
                </option>
                <option value="branding">Branding</option>
                <option value="food">Food</option>
                <option value="landscape">Landscape</option>
                <option value="fashion">Fashion</option>
                <option value="promotion">Promotions</option>
                <option value="custom">Customise</option>
                <option value="others">Other Inquiry</option>
              </select>
            </div>
            <div className="from-date item">
              <label htmlFor="fromDate"></label>
              <DatePicker
                selected={fromDate}
                selectsStart
                startDate={fromDate}
                endDate={toDate}
                onChange={date => setFromDate(date)}
                minDate={new Date()}
                placeholderText="Event Start"
              />
            </div>
            <div className="to-date item">
              <label htmlFor="toDate"></label>
              <DatePicker
                selected={toDate}
                selectsEnd
                endDate={toDate}
                minDate={fromDate}
                onChange={date => setToDate(date)}
                placeholderText="Event End"
              />
            </div>
            <div className="hours-needed item select">
              <label htmlFor="hoursNeeded"></label>
              <select
                name="hoursNeeded"
                id="hoursNeeded"
                value={hoursNeeded}
                onChange={e => setHoursNeeded(e.target.value)}
              >
                <option disabled className="text-hide" value="">
                  Time required
                </option>
                <option value="1-2 hours">1-2 hours</option>
                <option value="3 hours">morning</option>
                <option value="4-6 hours">half day</option>
                <option value="7-9 hours">evening</option>
                <option value="10-12 hours">full day</option>
                <option value="custom">custom</option>
              </select>
            </div>
            <div className="message item">
              <label htmlFor="message"></label>
              <textarea
                name="message"
                id="message"
                required
                value={message}
                className={nameErr ? "hasError" : ""}
                placeholder="Please provide us with all the requirements and details of the events "
                onChange={e => setMessage(e.target.value)}
              ></textarea>
              <small className="errorMsg">{messageErr}</small>
            </div>
            <input type="submit" value="Submit" />
          </form>

          <div className="info">
            <div className="row row1">
              <FontAwesomeIcon icon="map-marker-alt" className="icon" />
              <span>
                Tashas Blog <br />
                 <br /> Sydney, Australia
              </span>
            </div>
            <div className="row row2">
              <FontAwesomeIcon icon="envelope" className="icon" />
              <span className="email">
                contact <br /> @tasha_blogs@icloud.com
              </span>
            </div>
            <div className="row row3">
              <FontAwesomeIcon icon="phone" className="icon" />
              <span>+61452367065</span>
            </div>
          </div>
        </div>
      </section>
      <SuccessModal
        isShowing={isShowing}
        hide={toggle}
        successMsg={successMsg}
        setIsShowing={setIsShowing}
      />
    </>
  );
};

export default Contact;
