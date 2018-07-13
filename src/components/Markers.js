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
    
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
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
            <div id="marker-list">
                <div id="marker-search">
                    <input
                        className="search-markers"
                        type="text"
                        role="search"
                        aria-label="Type to search markers on the map"
                        placeholder="Search Houston"
                        value={query}
                        onChange={(e) => this.updateQuery(e.target.value)}
                    />
                </div>
            </div>
        )
    }
}

export default Markers