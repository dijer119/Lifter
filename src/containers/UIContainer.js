import { Container } from 'unstated';

class UIContainer extends Container {
  state = {
    sidebar: false
  };

  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };
}

export default UIContainer;
