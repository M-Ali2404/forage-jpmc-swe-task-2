import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button, and Graph react element.
 */
class App extends Component<{}, IState> {
  private intervalId: NodeJS.Timeout | null = null; // To store interval ID

  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responses.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0;
    //this.intervalId
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState(() => ({
          data: serverResponds,
          showGraph: true,
        }));
        x++;
        if (x > 1000) {
         //this.stopDataStreaming();
         clearInterval(interval);
        }
      });
    }, 100);
  }

  /**
   * Stop data streaming by clearing the interval
   */
  stopDataStreaming() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Render Graph react component with state.data parsed as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
    return null;
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"  
            onClick={()=>this.getDataFromServer()}

          >
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
