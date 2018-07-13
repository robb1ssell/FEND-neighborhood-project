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
    
    // change the query state when the user inputs something
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    // if user clicks a list item, focuses it on the map
    listItem = (item, e) => {
        let selected = markers.filter((current) => current.name === item.name)
        window.google.maps.event.trigger(selected[0], 'click')
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