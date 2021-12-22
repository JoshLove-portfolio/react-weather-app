import React, { useEffect } from 'react';
import axios from 'axios';

//Library used to track the long API call to 7timer
import {trackPromise} from 'react-promise-tracker';

//Load local JSON file which holds the categories to translate weather API call
import jsonData from './weather_API_data.json';

function Cards(props) {

    //Convert date format from YYYYMMDD to MM/DD/YYYY which is compatiable with Date library
    function convertDate(num) {
        let string_num = num.toString();
        let year = string_num.slice(0, 4);
        let month = string_num.slice(4, 6);
        let day = string_num.slice(6, 8);
        return month + '/' + day + '/' + year
    }

    //Prop has updated to the point that weather data has been retrieved
    if (props.value.weatherData.length != 0) {
        let cards = [];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        //Build the 7 cards
        for (let i = 0; i < props.value.weatherData.length; i++){

            //Set the current day, max temp and min temp for the current position in the weatherData array
            let currentDay = new Date(convertDate(props.value.weatherData[i].date));
            let maxTemp = props.value.weatherData[i].temp2m.max * 9 / 5 + 32;
            let minTemp = props.value.weatherData[i].temp2m.min * 9 / 5 + 32;

            //Push the new card into the cards array
            cards.push(
                <div className="col">
                    <div className="card">
                        <img className="card-img-top" src={props.value.meaningData.ico_assets[props.value.weatherData[i].weather]} alt="weather logo"></img>
                        <div className="card-body">
                            <h5 className="card-title">
                                {days[currentDay.getDay()]}
                            </h5>
                            <p className="card-text">
                                Forecast: {props.value.meaningData.weather_type[props.value.weatherData[i].weather]}
                                <br></br>
                                Wind Speed: {props.value.meaningData.wind_speed[props.value.weatherData[i].wind10m_max]}
                                <br></br>
                                High Temp: {Math.round(maxTemp)}&#8457;
                                <br></br>
                                Low Temp: {Math.round(minTemp)}&#8457;
                                <br></br>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }

        //Return cards array to render
        return cards;
    }

    //Weatherdata hasn't been called yet, create placeholder cards
    let cards = [];

    const defaultStyle = {
        textAlign: 'center',
        fontWeight: 'bold'
    }

    cards.push(
        <div className="col">
            <p style={defaultStyle}>
                Please enter your zip code to begin!
            </p>
        </div>
    )
    return cards;
}

class Interface extends React.Component {

    //Constructor which holds all of the necessary data that's used by the Cards function
    constructor(props) {
        super(props);
        this.state = {
            zip: null,
            lat: null,
            long: null,
            weatherData: [],
            meaningData: JSON.parse(JSON.stringify(jsonData))
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.set = this.set.bind(this);
        this.getWeatherData = this.getWeatherData.bind(this);
    }

    //Calls 7timer API with lat/long data and calls state set function
    getWeatherData() {
        let url = 'request'
        trackPromise(
            axios.get(`http://www.7timer.info/bin/api.pl?lon=${this.state.long}&lat=${this.state.lat}&product=civillight&output=json`)
            .then(res => this.set(res, url))
            .catch(error => console.log(error))
        );
    }

    //Takes in API call data and sets it to the current state
    set(res, url) {
        if (url === 'tx'){
            this.setState({
                lat: res.data[0].Lat,
                long: res.data[0].Lon,
            }, () => {
                this.getWeatherData(); //Callback following setting of lat/long since it's imperative those are set first
            });
        } else {
            this.setState({
                weatherData: res.data.dataseries
            })
        }
        
    }

    //Call USGS API to retrieve zipCode -> lat/long data and then pass that into the set function
    convertZip() {
        let url = 'tx';
        axios
        .get(`https://txdata.usgs.gov/search_api/2.1/services.ashx/search?term=${this.state.zip}&include_gnis_major=false
        &include_gnis_minor=false&include_state=false&include_area_code=false&include_usgs_sw=false
        &include_usgs_gw=false&include_usgs_sp=false&include_usgs_at=false&include_usgs_ot=false
        &include_huc2=false&include_huc4=false&include_huc6=false&include_huc8=false&include_huc10=false&include_huc12=false`)
        .then(res => this.set(res, url))
        .catch(error => console.log(error));
    }

    //Function to handle submit event on the ZipField element
    handleSubmit(event) {
        this.setState({
            zip: event.target.elements.ZipField.value
        }, () => {
            this.convertZip();
        });
        event.preventDefault();
    }
    
    //Renders the cards -> props is passed down to Cards function which allows for them to update once all the API calls have been made
    renderCards(){
        return (
            <div className="container">
                <div className="row">
                    <Cards value={this.state}/>
                </div>
                <div>
                <br></br>
                <br></br>
                <br></br>
                    Location Services provided by: <a href="https://webapps.usgs.gov/" target="_blank">USGS</a>
                    <br></br>
                    Weather Data provided by: <a href="http://www.7timer.info/index.php?lang=en" target="_blank">7timer</a>
                    <br></br>
                    Icons provided by: <a href="https://icons8.com/icon/set/weather/ios--animated" target="_blank">Icons8</a>
                    <br></br>
                    Created by: <a href="https://github.com/JoshLove-portfolio" target="_blank">Josh Love</a>
                </div>
            </div>
        )
    }

    //Render the main page
    render() {
        return (
            <div className="container">
                <br></br>
                <form className="row g-3" onSubmit={this.handleSubmit}>
                <div className="col-auto">
                    <label htmlFor="staticZip" className="visually-hidden">Zip</label>
                    <input type="text" readOnly className="form-control-plaintext" value="Zip Code:"></input>
                </div>
                <div className="col-auto">
                    <label htmlFor="inputZip" className="visually-hidden">Zip</label>
                    <input type="text" className="form-control" placeholder="00000" name="ZipField"></input>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Submit</button>
                </div>
                </form>
                {this.renderCards()}
            </div>
        )
    }
    
}

export default Interface;