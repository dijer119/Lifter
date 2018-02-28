import { Container } from 'unstated';

import axios from '../axios-instance';

class AuthContainer extends Container {
  state = {
    email: '',
    password: '',
    loggedIn: false,
    loginError: false,
    signupError: false,
    formErrorMessage: null,
    disabled: false
  };

  logMeIn = () => {
    if (!this.state.loggedIn) {
      this.setState({ loggedIn: true });
    }
  };

  logMeOut = () => {
    if (this.state.loggedIn) {
      localStorage.removeItem('expiration-date');
      localStorage.removeItem('lifter-token');
      localStorage.removeItem('lifter-id');
      localStorage.removeItem('email');

      this.setState({ loggedIn: false });
    }
  };

  inputChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  setLoginUp = res => {
    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    localStorage.setItem('lifter-token', `${res.data.idToken}`);
    localStorage.setItem('lifter-id', `${res.data.localId}`);
    localStorage.setItem('expiration-date', `${expirationDate}`);
    localStorage.setItem('email', `${res.data.email}`);

    this.setState({
      email: '',
      password: '',
      loggedIn: true,
      loginError: false,
      signupError: false,
      formErrorMessage: null,
      disabled: false
    });
  };

  // Ao submeter o formulário de Login
  handleLogin = event => {
    event.preventDefault();

    this.setState({ disabled: true });

    const { email, password } = this.state;
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    axios
      .post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBxgmEYlI53zJSohnTjg_gSe7gs62t0fxY',
        payload
      )
      .then(res => {
        this.setLoginUp(res);
      })
      .catch(err => {
        this.setState({
          disabled: false,
          loginError: true,
          formErrorMessage: err.response.data.error.message
        });
        setTimeout(() => {
          this.setState({ loginError: false, formErrorMessage: null });
        }, 3000);
      });
  };

  // Ao submeter o formulário de Signup
  handleSignup = event => {
    event.preventDefault();

    this.setState({ disabled: true });

    const { email, password } = this.state;
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    axios
      .post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBxgmEYlI53zJSohnTjg_gSe7gs62t0fxY',
        payload
      )
      .then(res => {
        this.setLoginUp(res);
      })
      .catch(err => {
        this.setState({
          disabled: false,
          signupError: true,
          formErrorMessage: err.response.data.error.message
        });
        setTimeout(() => {
          this.setState({ signupError: false, formErrorMessage: null });
        }, 3000);
      });
  };
}

export default AuthContainer;
