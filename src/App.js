import React from 'react';
import Home from './screens/HomeScreen'
import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pagina: <Home />,
    }
  }
  
  render() {

    return (
      <div id="wrapper">
        {this.state.pagina}
      </div>
    );
  }
}
export default App;