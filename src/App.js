import React from 'react';
import './App.css';
import Markers from './components/Markers'

const locations = [
    { name: 'Houston Zoo', lat: 29.714234, lng: -95.388654},
    { name: 'Houston Arboretum', lat: 29.765215, lng: -95.451973},
    { name: 'NRG Stadium', lat: 29.684703, lng: -95.410921},
    { name: 'Hobby Airport', lat: 29.645592, lng: -95.277473},
    { name: 'Downtown Aquarium', lat: 29.764336, lng: -95.367355},
    { name: 'Minute Maid Park', lat: 29.757319, lng: -95.355272},
    { name: 'Sam Houston Race Park', lat: 29.929746, lng: -95.530073},
    { name: 'George Bush Intercontinental Airport', lat: 29.987638, lng: -95.336989},
    { name: 'Sam Houston Statue', lat: 30.661781, lng: -95.510702}
]

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
                        role="applicaton"
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
