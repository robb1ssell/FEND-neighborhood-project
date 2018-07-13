import React from 'react';
import './App.css';
import Markers from './components/Markers'

const locations = []

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className='search'>
                    <header>
                        <h1>Houston, Texas</h1>
                    </header>
                    <Markers
                        locations={locations}
                    />
                </div>
                <div id="map"
                    role="applicaton"
                    aria-label="Map of Houston, Texas"
                    tabIndex="-1"
                >
                </div>
            </div>
        );
    }
}

export default App;
