import React from "react";
import "./App.css";

import "antd/dist/antd.css";

import { AutoComplete, Input ,Card} from "antd";


//NOTE: IF THE APP CRASHES THEN PLEASE REMOVE FIRST FOUR LINES OF RENDER() METHOD AND UNCOMMENT THE OPTIONS VARIABLE THEN RUN...ITS PROBABLY BECAUSE THE CITY NAMES ARE MORE THAN 80000  


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      gotData: false,
      data: {},
    };
    this.getData = this.getData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount(){
    
  }
  handleSearch(e) {
    console.log(e);
    this.setState({ city: e });
  }
  getData(value) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=17753e9f324a54fb9b7abac71240703f`
    )
      .then((response) => {
        if (response.ok) {
          let temp = response.json();
          //console.log(temp);
          return temp;
        }
      })
      .then((data) => {
          this.setState({ gotData: true, data: data, city:value });
          //console.log(data);
        
      })
      .catch((error) => {
        if(!alert("Could'nt get data, Please Select a Valid City")){window.location.reload();}
        console.error("Error while fetching weather data", error);
      });
  }
  render() {
    const cities = require("cities-list");
    let keys = (Object.keys(cities));
    let options = keys.map((key)=>{return {value:key}})
    console.log(options)
    /*let options = [
      {
        value: "Bangalore",
      },{
        value: "Mysore",
      },{
        value: "kolkata",
      },{
        value: "Chennai",
      },{
        value: "Mumbai",
      },{
        value: "Vellore",
      },{
        value: "Delhi",
      },{
        value: "Hubli",
      },{
        value: "Singapore",
      },{
        value: "Sydney",
      },{
        value: "Perth",
      },{
        value: "Georgia",
      },{
        value: "Texas",
      },{
        value: "San Jose",
      },{
        value: "New England",
      },{
        value: "New Orleans",
      },
      {
        value: "London",
      },
      {
        value: "New york",
      },
    ];*/

    const { data, gotData, city } = this.state;

    
    const handleKeyPress = (ev) => {
      console.log("handleKeyPress", ev);
    };

    const onSelect = (value) => {
      console.log("onSelect", value);
      this.getData(value)

    };
    const handleSearch = (value) => {
      console.log("search", value);
    };
    if (gotData) {
      return (
        
        <div className="App">
          <div className="App" style={{paddingTop:'2%',paddingBottom:"2%",backgroundColor:'#072e4a'}}>
          <h1><b style={{color:"white"}}>Weather App</b></h1>
          <AutoComplete
            filterOption={true}
            options={options}
            style={{
              width: 200,
            }}
            defaultOpen={false}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input
              placeholder="Search for a City"
              className="custom"
              style={{
                height: 50,
              }}
              onKeyPress={handleKeyPress}
            />
          </AutoComplete>
        </div>
        <div style={{backgroundColor:"orange",paddingTop:'2%',paddingBottom:"2.5%"}}>
          <Card title={`${city} Weather data is as follows`} style={{width:"50%",marginLeft:"25%",backgroundColor:"#f2bb55"}}>
            

            <p>Main : {JSON.stringify(data.weather[0].main)}</p>
            <p>Description : {JSON.stringify(data.weather[0].description)}</p>
            <p>Temperature : {JSON.stringify(data.main.temp)}</p>
            <p>Temperature Minimun : {JSON.stringify(data.main.temp_min)}</p>
            <p>Temperature Maximum : {JSON.stringify(data.main.temp_max)}</p>
            <p>Pressure : {JSON.stringify(data.main.pressure)}</p>
            <p>Humidity : {JSON.stringify(data.main.humidity)}</p>
            <p>Visibility : {JSON.stringify(data.visibility)}</p>
            <p>Wind : Speed: {JSON.stringify(data.wind.speed)} Degree: {JSON.stringify(data.wind.deg)}</p>
            
          </Card>
        </div>
        </div>
      );
    } else {
      

      return (
        <div className="App" style={{paddingTop:'2%',paddingBottom:"2%",backgroundColor:'#072e4a'}}>
          <h1><b style={{color:"white"}}>Weather App</b></h1>
          <AutoComplete
            filterOption={true}
            options={options}
            style={{
              width: 200,
            }}
            defaultOpen={false}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input
              placeholder="Search for a City"
              className="custom"
              style={{
                height: 50,
              }}
              onKeyPress={handleKeyPress}
            />
          </AutoComplete>
        </div>
      );
    }
  }
}

export default App;
