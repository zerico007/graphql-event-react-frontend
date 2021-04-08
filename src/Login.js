import React, { useState } from "react";
import styled from "@emotion/styled";

const FormDiv = styled.div`
  width: 300px;
  height: 200px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.1rem 0.1rem 0.1rem 0.05rem grey;
  background: #eceff9;
  border-radius: 6px;
`;

const Input = styled.input`
  width: 150px;
  height: 2rem;
  padding: 8px 12px;
  box-sizing: border-box;
  margin: 10px 0;
`;

const Button = styled.button`
  width: 100px;
  height: 36px;
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  background: #4568cb;
  color: white;
  margin: 10px 0;
  font-size: 0.8rem;
  font-weight: bold;
`;

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormDiv>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={(e) => handleLogin(e, email, password)}
      >
        <Input
          type="email"
          placeholder="Email Address"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </FormDiv>
  );
};

export default Login;
