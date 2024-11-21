import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./index.css";

class LoginForm extends Component {
  state = {
    usernameInput: "",
    passwordInput: "",
    errorMsg: "",
    showErrorMsg: false,
    showPassword: false,
    redirectToHome: false,
  };

  onSuccessLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    this.setState({ redirectToHome: true });
  };

  onFailureLogin = (errorMsg) => {
    this.setState({ errorMsg, showErrorMsg: true });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { usernameInput, passwordInput } = this.state;

    let updatedUsername =
      usernameInput.toLowerCase().trim() === "tarun" ? "rahul" : usernameInput;
    let updatedPassword =
      passwordInput === "tarun@9849" ? "rahul@2021" : passwordInput;

    const userDetails = {
      username: updatedUsername,
      password: updatedPassword,
    };
    const LoginApiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(LoginApiUrl, options);
    const data = await response.json();

    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token);
    } else {
      this.onFailureLogin(data.error_msg);
    }
  };

  updateUsername = (event) =>
    this.setState({ usernameInput: event.target.value });

  updatePassword = (event) =>
    this.setState({ passwordInput: event.target.value });

  toggleShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  renderUsernameField = () => {
    const { usernameInput } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={usernameInput}
          onChange={this.updateUsername}
          placeholder="tarun"
        />
      </>
    );
  };

  renderPasswordField = () => {
    const { passwordInput, showPassword } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="password-input-field"
          value={passwordInput}
          onChange={this.updatePassword}
          placeholder="tarun@9849"
        />
        <div className="show-password">
          <input
            type="checkbox"
            id="show-password"
            onChange={this.toggleShowPassword}
          />
          <label htmlFor="show-password">Show Password</label>
        </div>
      </>
    );
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    }

    if (this.state.redirectToHome) {
      return <Navigate to="/" />;
    }

    const { errorMsg, showErrorMsg } = this.state;

    return (
      <div className="login-form-container">
        <img
          src="https://ik.imagekit.io/6nnzgbkjv4/Logo.png?updatedAt=1732168705771"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://ik.imagekit.io/6nnzgbkjv4/Logo.png?updatedAt=1732168705771"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
