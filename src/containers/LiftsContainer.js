import { Container } from 'unstated';

import axios from '../axios-instance';
import {
  filterTypedValue,
  formatForFirebase,
  userLiftsWithKilos,
  addKilosToValue
} from '../helpers/helpers';

let timeout;

class LiftsContainer extends Container {
  state = {
    liftname: '',
    lifts: {},
    disabled: false,
    error: false,
    removing: false,
    alreadyTaken: false
  };

  logMeOut = () => {
    this.setState({ liftname: '', lifts: {} });
  };

  inputChange = event => {
    const { value } = event.target;
    if (value.length < 20) {
      this.setState({ liftname: value });
    }
  };

  editWeight = e => {
    const lifterId = localStorage.getItem('lifter-id');
    const { value, name } = e.target;
    const filteredValue = filterTypedValue(value);
    const valueWithKilos = addKilosToValue(filteredValue);

    if (value.length < 15) {
      const newState = { lifts: { ...this.state.lifts, [name]: valueWithKilos } };
      this.setState(newState);
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      axios
        .put(`${lifterId}/lifts/${name}.json`, formatForFirebase(this.state.lifts[name]))
        .then(res => console.log(res))
        .catch(err => {
          this.setState({
            error: true
          });
          setTimeout(() => {
            this.setState({ error: false });
          }, 3000);
        });
    }, 800);
  };

  removeLift = lift => {
    const lifterId = localStorage.getItem('lifter-id');
    this.setState({ removing: true });

    axios
      .delete(`${lifterId}/lifts/${lift}.json`)
      .then(res => {
        const { [lift]: value, ...otherLifts } = this.state.lifts;
        this.setState({ lifts: { ...otherLifts }, removing: false });
      })
      .catch(err => {
        this.setState({
          error: true,
          removing: false
        });
        setTimeout(() => {
          this.setState({ error: false });
        }, 3000);
      });
  };

  addNewLift = e => {
    e.preventDefault();

    this.setState({ disabled: true });

    const lifterId = localStorage.getItem('lifter-id');
    const typedLift = this.state.liftname.toLowerCase();
    const lifts = this.state.lifts;
    const liftAlreadyExists = lifts.hasOwnProperty(typedLift);

    if (liftAlreadyExists) {
      this.setState({
        alreadyTaken: true
      });
      setTimeout(() => {
        this.setState({ alreadyTaken: false });
      }, 3000);
    } else {
      axios
        .put(`${lifterId}.json`, { lifts: { ...lifts, [typedLift]: 0 } })
        .then(res =>
          this.setState({
            disabled: false,
            liftname: '',
            lifts: { ...userLiftsWithKilos(res.data.lifts) }
          })
        )
        .catch(err => {
          this.setState({
            error: true,
            disabled: false
          });
          setTimeout(() => {
            this.setState({ error: false });
          }, 3000);
        });
    }
  };

  getUserLifts = () => {
    const lifterId = localStorage.getItem('lifter-id');

    axios.get(`${lifterId}.json`).then(res => {
      if (!res.data) {
        axios
          .put(`${lifterId}.json`, { lifts: { squat: 0 } })
          .then(res => this.setState({ lifts: { ...userLiftsWithKilos(res.data.lifts) } }))
          .catch(err => {
            this.setState({
              error: true
            });
            setTimeout(() => {
              this.setState({ error: false });
            }, 3000);
          });
      } else {
        this.setState({ lifts: { ...userLiftsWithKilos(res.data.lifts) } });
      }
    });
  };
}

export default LiftsContainer;
