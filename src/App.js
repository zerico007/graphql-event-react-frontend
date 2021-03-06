import React, { useState } from "react";
import styled from "@emotion/styled";
import jwt_decode from "jwt-decode";
import Login from "./Login";
import EventsContainer from "./EventsContainer";
import { usePersistedState } from "./utils";
import { setBearerToken, reachApi } from "./network";

const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoutBtn = styled.button`
  position: absolute;
  top: 40px;
  right: 100px;
  background: #407294;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
  font-weight: 800;
  color: white;
  &:hover {
    transform: scale(1.2);
  }
`;

function App() {
  const [user, setUser] = usePersistedState("user", {});
  const [page, setPage] = usePersistedState("page", "login");
  const [events, setEvents] = useState([]);

  const getUser = (token) => {
    const user = jwt_decode(token);
    const { email, password, userId } = user;
    setUser({ email, password, userId });
  };

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    reachApi(`
      {
        login(userInput: {email: "${email}", password: "${password}"})
      }
        `)
      .then((result) => {
        getUser(result.data.data.login);
        setBearerToken(result.data.data.login);
        setPage("events");
      })
      .catch((err) => console.log(err.message));
  };

  const fetchEvents = () => {
    reachApi(`
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
    reachApi(`
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
    reachApi(
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
      {page !== "login" && (
        <LogoutBtn
          onClick={() => {
            setPage("login");
            setUser({});
            setEvents([]);
          }}
        >
          Logout
        </LogoutBtn>
      )}
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
