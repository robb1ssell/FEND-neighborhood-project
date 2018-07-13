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
    
    render() {
        return(
            <div id="marker-list">
                <div id="marker-search">
                    <input
                        className="search-markers"
                        type="text"
                        role="search"
                        aria-label="Type to search markers on the map"
                        placeholder="Search Houston"
                        value={query}
                        onChange={something}
                    />
                </div>
            </div>
        )
    }
}

export default Markers