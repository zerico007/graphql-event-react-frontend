import React from "react";
import styled from "@emotion/styled";
import Event from "./Event";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EventWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const LoadEventsBtn = styled.div`
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

const EventsContainer = ({ events, user, fetchEvents, bookEvent }) => {
  return (
    <Wrapper>
      <EventWrapper>
        {events?.map((event, index) => {
          return (
            <Event
              title={event.title}
              date={event.date}
              description={event.description}
              price={event.price}
              createdBy={event.createdBy.email}
              user={user}
              bookEvent={bookEvent}
              eventId={event._id}
              key={index}
            />
          );
        })}
      </EventWrapper>
      <LoadEventsBtn onClick={fetchEvents}>Load Events</LoadEventsBtn>
    </Wrapper>
  );
};

export default EventsContainer;
