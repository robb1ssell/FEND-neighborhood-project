import React from 'react'
import escapeRegExp from 'escape-string-regexp'
import scriptLoader from 'react-async-script-loader'
import fetchJsonp from 'fetch-jsonp'

let markers = []
let infoWindows = []

class Markers extends React.Component {
    constructor(props) {
        super(props) // bring props from parent to access locations array
        this.state = {
            list: this.props.locations,
            map: {}, // holds our map object
            info: [],
            query: '' // used to isolate markers during search
        }
    }

    componentWillReceiveProps({isScriptLoaded}) {
        if(isScriptLoaded) {
            let mapView = document.getElementById('map');
            mapView.style.height = window.innerHeight + "px";

            let map = new window.google.maps.Map(mapView, {
                center: {lat: 29.774684, lng: -95.370803},
                zoom: 11
            });

            this.setState({map: map});
        }
        else {
            console.log('Error loading map.')
        }
    }

    componentDidMount() {
        this.state.list.map((item) => {
            return fetchJsonp(
                `https://en.wikipedia.org/w/api.php?action=opensearch&search=${item.name}&format=json&callback=wikiCallback`)
                .then(response => response.json()).then((responseJson) => {
                        let info = [...this.state.info, [responseJson, responseJson[2][0], responseJson[3][0]]]
                        this.updateInfo(info)
                    }).catch(error => 
                        console.error(error))
        })
    }

    updateInfo = (info) => {
        this.setState({info: info})
    }
    
    // change the query state when the user inputs something
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    // if user clicks a list item, focuses it on the map
    listItem = (item, e) => {
        let selected = markers.filter((current) => current.name === item.name)
        window.google.maps.event.trigger(selected[0], 'click')
    }

    // check search string and filter list accordingly
    // set global arrays to empty and refill without empty strings
    // add markers with infowindows and event listeners to open and close
    componentDidUpdate() {
        const { list, query, map } = this.state
        let showingList = list
        if(query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingList = list.filter((item) => match.test(item.name))
        }
        else {
            showingList = list
        }

        markers.forEach(marker => {
            marker.setMap(null)
        });

        markers = []
        infoWindows = []
        showingList.map((marker) => {
            let getInfo = this.state.info.filter((single) => 
                marker.name === single [0][0]).map(second => {
                    if(second.length === 0) {
                        return 'No info for this location';
                    }
                    else if(second[1] !== '') {
                        return second[1];
                    }
                    else {
                        return 'No info for this location';
                    }
                });
            let infoContent = `<div className="info-window">
                                <h4>${marker.name}</h4>
                                    <p>${getInfo}</p>
                                </div>`;
            let addInfo = new window.google.maps.InfoWindow({content: infoContent});
            let addMarker = new window.google.maps.Marker({
                position: {lat: marker.lat, lng: marker.lng},
                map: map,
                name: marker.name,
                animation: window.google.maps.Animation.DROP
            });
            markers.push(addMarker);
            infoWindows.push(addInfo);

            addMarker.addListener('click', function() {
                infoWindows.forEach(item => {item.close()});
                addInfo.open(map, addMarker);
            });
        })
    }

    render() {

        let {list, query} = this.state;
        let showingList = list

        // if something is in search box, filter list. If empty, show all items.
        // taken from previous lesson project contacts app
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingList = list.filter((item) => match.test(item.name))
        }
        else {
            showingList = list
        }

        return(
            <div id="list-markers">
                <div id="search-markers">
                    <input
                        className="marker-search"
                        type="text"
                        role="search"
                        aria-label="Type to search markers on the map"
                        placeholder="Search Houston"
                        value={query}
                        onChange={(e) => this.updateQuery(e.target.value)}
                    />
                </div>
                <ul
                    tabIndex="2"
                    aria-label="List of some significant Houston destinations"
                >
                    {showingList.map((item, index) => (
                        <li key={index}
                            className="list-item"
                            tabIndex={index+2}
                            onClick={this.listItem.bind(this, item)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=AIzaSyARWgHczFrsg7_MepX_G7tE_9Hg1w170U8`]
)(Markers);