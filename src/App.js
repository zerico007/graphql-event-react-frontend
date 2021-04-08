import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Login from "./Login";
import EventsContainer from "./EventsContainer";
import { usePersistedState } from "./utils";

const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [user, setUser] = usePersistedState("user", {});
  const [page, setPage] = usePersistedState("page", "login");
  const [events, setEvents] = useState([]);

  const touchApi = (query) =>
    axios({
      url: "http://localhost:4040/eventapi",
      method: "post",
      data: {
        query,
      },
    });

  const getUser = (token) => {
    const user = jwt_decode(token);
    const { email, password, userId } = user;
    setUser({ email, password, userId });
  };

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    touchApi(`
      {
        login(userInput: {email: "${email}", password: "${password}"})
      }
        `)
      .then((result) => {
        console.log(result.data.data.login);
        getUser(result.data.data.login);
        setPage("events");
      })
      .catch((err) => console.log(err.message));
  };

  const fetchEvents = () => {
    touchApi(`
    {
      events {
        _id
        title
        description
        price
        date
        createdBy {
          email
        }
      }
    }
      `)
      .then((result) => {
        console.log(result.data);
        setEvents([...result.data.data.events]);
      })
      .catch((err) => console.log(err.message));
  };

  const bookEvent = (eventId, userId) => {
    touchApi(`
    mutation {
      bookEvent(eventId: "${eventId}", userId: "${userId}") {
        event{
          title
        }
        user {
          email
        }
      }
    }
    `)
      .then((response) => {
        console.log(response.data);
        alert("Event booked!");
      })
      .catch((err) => console.log(err));
  };

  const cancelBooking = (bookingId) => {
    touchApi(
      `
      mutation {
        cancelBooking(bookingId: "${bookingId}") {
          title
        }
      }
      `
    );
  };

  return (
    <WrapperDiv>
      {page === "login" && <Login handleLogin={handleLogin} />}
      {page === "events" && (
        <EventsContainer
          user={user}
          fetchEvents={fetchEvents}
          bookEvent={bookEvent}
          events={events}
        />
      )}
    </WrapperDiv>
  );
}

export default App;
