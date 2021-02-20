import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { Input, Button } from "antd";

function ScreenHome(props) {
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageSignin, setErrorMessageSignin] = useState("");

  const handleSubmitSignUp = (props) => {
    const signUpDB = async () => {
      let rawResponse = await fetch("/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `usernameFromFront=${signUpUserName}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
      });
      let response = await rawResponse.json();

      console.log(response);
      if (!response.result) {
        setErrorMessage(
          "Oups ! Cet utilisateur existe déjà ou l'un des champs est vide 😟"
        );
      } else {
        setIsLogin(true);
        props.recordToken(response.token);
      }
    };
    signUpDB();
  };

  const handleSubmitSignIn = (props) => {
    const checkDB = async () => {
      let rawResponse = await fetch("/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
      });
      let response = await rawResponse.json();
      // console.log(response);
      if (!response.result) {
        setErrorMessageSignin("L'email ou le password n'existe pas !😤");
      } else {
        setIsLogin(true);
        props.recordToken(response.token);
      }
    };
    checkDB();
  };

  useEffect(() => {
    // console.log(isLogin);
  }, [isLogin]);

  return (
    <div className="header">
      <div className="titre">
        <h1>Morning News </h1>
      </div>
      <div className="Login-page">
        {isLogin ? <Redirect to="/screensource" /> : null}
        {/* SIGN-IN */}

        <div className="Sign">
          <Input
            className="Login-input"
            placeholder="arthur@lacapsule.com"
            required
            onChange={(e) => setSignInEmail(e.target.value)}
            value={signInEmail}
          />

          <Input.Password
            className="Login-input"
            placeholder="password"
            required
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <h5 className="error-message">{errorMessageSignin}</h5>
          <Button
            href=""
            style={{ width: "80px" }}
            onClick={(e) => {
              e.preventDefault();
              handleSubmitSignIn(props);
            }}
          >
            Sign-In
          </Button>
        </div>

        {/* SIGN-UP */}

        <div className="Sign">
          <Input
            className="Login-input"
            placeholder="User"
            required
            onChange={(e) => {
              setSignUpUserName(e.target.value);
              setErrorMessage("");
            }}
            value={signUpUserName}
          />

          <Input
            className="Login-input"
            placeholder="arthur@lacapsule.com"
            required
            onChange={(e) => {
              setSignUpEmail(e.target.value);
              setErrorMessage("");
            }}
            value={signUpEmail}
          />

          <Input.Password
            className="Login-input"
            placeholder="password"
            required
            onChange={(e) => {
              setSignUpPassword(e.target.value);
              setErrorMessage("");
            }}
            value={signUpPassword}
          />
          <h5 className="error-message">{errorMessage}</h5>
          <Button
            href=""
            style={{ width: "80px" }}
            onClick={(e) => {
              e.preventDefault();
              handleSubmitSignUp(props);
            }}
          >
            Sign-up
          </Button>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    recordToken: function (token) {
      dispatch({ type: "tokenok", token });
      console.log(token);
    },
  };
}

// function mapStateToProps(state) {
//   console.log(state);
//   return { userToken: state.token };
// }

export default connect(null, mapDispatchToProps)(ScreenHome);
