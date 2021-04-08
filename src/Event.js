import React, { useState } from "react";
import styled from "@emotion/styled";

const EventDiv = styled.div`
  width: 40vw;
  height: 40vh;
  margin: 40px auto;
  display: grid;
  grid-template-areas:
    "title title"
    "desc desc"
    "date price"
    "created created"
    "button button";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid black;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.1rem 0.05rem grey;
  background: #eceff9;
  animation: enterTop 2s;
`;

const BookEventsBtn = styled.button`
  width: 200px;
  height: 36px;
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  background: #4568cb;
  color: white;
  margin: 10px auto;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #407294;
    transform: scale(1.2);
  }
`;

const Event = ({
  date,
  description,
  title,
  price,
  createdBy,
  user,
  eventId,
  bookEvent,
}) => {
  const [booked, setBooked] = useState(false);
  return (
    <EventDiv>
      <h3 style={{ gridArea: "title" }}>{title}</h3>
      <p style={{ gridArea: "desc" }}>
        Description: <br /> <br />
        <strong>{description}</strong>
      </p>
      <p style={{ gridArea: "date" }}>
        Date: <strong>{date}</strong>
      </p>
      <p style={{ gridArea: "price" }}>
        Price:{" "}
        <strong>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </strong>
      </p>
      <p style={{ gridArea: "created" }}>
        Created by: <strong>{createdBy}</strong>
      </p>
      <BookEventsBtn
        onClick={() => {
          !booked && bookEvent(eventId, user.userId);
          setBooked(true);
        }}
        style={{ gridArea: "button" }}
      >
        {booked ? "Booked" : "Book Event"}
      </BookEventsBtn>
    </EventDiv>
  );
};

export default Event;
