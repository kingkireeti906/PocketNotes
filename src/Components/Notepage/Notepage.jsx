import React, { useState, useEffect } from "react";
import Styles from "./Notepage.module.css";
import Enable from "../../Images/enable(6).svg";
import Disable from "../../Images/disable (6).svg";
import Arrow from "../../Images/vector.png";
import Homepage from "../Homepage/Homepage";

function Notepage({ selectedContainers, clickedGroup }) {
  const [inputValue, setInputValue] = useState("");
  const [groupMessages, setGroupMessages] = useState([]);
  const [dotEnabled, setDotEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(false);

  const clickedContainer = selectedContainers.find(
    (container) => container.groupName === clickedGroup?.groupName
  );

  const toggleDot = () => {
    setDotEnabled(!dotEnabled);
  };

  const handleSubmit = () => {
    if (inputValue.length > 0) {
      const currentDate = new Date();
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      const month = monthNames[currentDate.getMonth()];
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      const newMessage = {
        text: inputValue,
        timestamp: `${day} ${month} ${year}`,
        time: `${hours}:${minutes} ${ampm}`,
      };

      setGroupMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const groupKey = clickedGroup?.groupName || "default";
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || {};
      setGroupMessages(storedMessages[groupKey] || []);
      setLoading(false);
    };

    fetchData();
  }, [clickedGroup]);

  useEffect(() => {
    if (!loading) {
      const groupKey = clickedGroup?.groupName || "default";
      const updatedMessages = {
        ...JSON.parse(localStorage.getItem("messages")) || {},
        [groupKey]: groupMessages || [],
      };
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
    }
  }, [groupMessages, clickedGroup, loading]);

  const formatGroupName = (groupName) => {
    const formattedText = groupName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);

    return formattedText;
  };

  const handleArrowClick = () => {
    setDisplay(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Styles.notepage}>
      {display ? <Homepage /> : null}
      <div className={Styles.header}>
        <div className={Styles.arrow} onClick={handleArrowClick}>
          <img src={Arrow} alt="Arrow" />
        </div>
        {clickedContainer &&
          clickedContainer.color &&
          clickedContainer.groupName && (
            <div
              style={{
                backgroundColor: clickedContainer.color,
                width: "58px",
                height: "58px",
                borderRadius: "100%",
                position: "absolute",
                margin: "20px",
                top: "-20%",
                left: "3%",
              }}
            >
              <div className={Styles.groupName}>
                {clickedContainer.groupName}
              </div>
              <div className={Styles.groupNamed}>
                {formatGroupName(clickedContainer.groupName)}
              </div>
            </div>
          )}
      </div>
      <div className={Styles.middle}>
        {groupMessages.map((message, index) => (
          <div key={index} style={groupMessages.length > 0 ? { width: '99%', position: 'relative', padding: '1%', marginTop: '1%', background: '#fff' } : { border: '0px solid #DAE5F5;' }}>
            <div className={Styles.message}>
              {message.text}
              <div className={Styles.stamping}>
                <div> {message.timestamp} <span id={Styles.dot}></span> {message.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!display && (
        <div className={Styles.footer}>
          <textarea
            id={Styles.textarea}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Here’s the sample text for sample work"
          ></textarea>
          <div id={Styles.icon} onClick={handleSubmit}>
            <img
              src={inputValue.length === 0 ? Disable : Enable}
              alt="Icon"
              onClick={toggleDot}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Notepage;
