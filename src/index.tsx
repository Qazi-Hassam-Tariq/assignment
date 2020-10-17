import * as React from "react";
import { render } from "react-dom";
import { Demo } from './components/Demo';

interface IState {
  count: number;
}

class App extends React.Component<{}, IState> {
 
  public render() {
    return (
      <div>
       <Demo/>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
