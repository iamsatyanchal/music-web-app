import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css';


// list of all possible enums in child
const VIEW_CALLBACK_ENUMS = {
    PLAY: 'SONG_TABLE/PLAY',
  };

const divStyle = {
    width: "100%",
    height: "100%",
    bottom: "100px",
    overflowY: "scroll"

};

const stylePlayerButton = {width: "40px", height: "40px", background: "transparent", border: "0", outline: "none"}

class SongTable extends Component {
    constructor(props) {
        super(props)
        this.onPlayDown = this.onPlayDown.bind(this);
    }

    componentDidMount1() {
            var settings = {
                APIkey:		"abc",
                ime:        null,
                limit:		25,
                cont:       null
            };
            var imeBenda = settings.ime.replace(/&/g, '%26').replace(/\+/g, '%2B');
            /*
            var url = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" 
                      + imeBenda + 
                      "&api_key=" 
                      + settings.APIkey + 
                      "&format=json&limit=" 
                      + settings.limit;
            */
           let url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json"
            var tracks = [];
            var trimas = [];
            var out = [];
        
            fetch(url).then(response => {
                return response.json();
              }).then(data => {
                // Work with your JSON data here..
                console.log(data);
              }).catch(err => {
                // What do when the request fails
                console.log('The request failed!'); 
              });

        //this.setState({songs: songs});
      }

    onPlayDown(e) {
        let id = e.currentTarget.getAttribute('song_id');
        console.log("play " + e.currentTarget + " "+ id);

        this.props.callbackHandler(
            VIEW_CALLBACK_ENUMS.PLAY,
            {id : id});
    }

    render() {

        let list = this.props.songs;

        let items = list.map( (val, i) =>
            <tr key={i}>
                <td>
                <button id="play-button" style={stylePlayerButton} onClick={this.onPlayDown} song_id={i}>
                    <svg id="icon-skip-play" viewBox="0 0 24 24" width="100%" height="100%" style={{fill: "rgb(200, 200, 200)"}}>
                        <path d="M 17.488289,12 4.3498907,3.6967476 V 20.303252 Z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </button>
                </td>
                <td>{val.name + " " + i}</td>
                <td><a href="www">{val.artists[0]}</a></td>
            </tr>

        );

        return (
            <div style={divStyle}>
            <table id="songs">
                <tbody>
                <tr>
                    <th></th>
                    <th>Top Songs</th>
                    <th>Artist</th>
                </tr>
                {items}
                </tbody>
            </table>
            
            </div>
        )
    }
}

export default SongTable

export {
    VIEW_CALLBACK_ENUMS as SONG_TABLE_CB_ENUMS,
  };
/*

infinte list

onComponentDidMount

data = select * from song limit 100 page 5

data.map () {
    make the table
}


*/