import React from 'react';
import './App.css';
import Markers from './components/Markers'
import { locations } from './data/locations'

class App extends React.Component {
    render() {
        return (
            <div className="App container-fluid">
                <div className="row">
                    <div className='search col-lg-3'>
                        <header>
                            <h1>Houston, Texas</h1>
                            <hr/>
                        </header>
                        <Markers
                            locations={locations}
                        />
                    </div>
                    <div id="map"
                        className="col-lg-9"
                        role="presentation"
                        aria-hidden="true"
                        aria-label="Map of Houston, Texas"
                        tabIndex="-1"
                    >
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
