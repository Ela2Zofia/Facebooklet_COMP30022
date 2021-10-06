import { RiContactsBookLine, RiVidiconLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Network from "../util/Network";
import "../css/Home.css";
import ReactWeather, { useOpenWeather } from "react-open-weather";

function Home() {

  const greetings = [
    "How is your day?",
    "How are you doing today?",
    "What's poppin'!",
    "May the Force be with you!",
    "Elementary, my dear Watson!",
    "It does not do to dwell on dreams and forget to live.",
    "To boldly go where no man has gone before.",
    "Oh, my dear friend. How I’ve missed you."

  ];
  const user = useSelector( state => state.user );
  const [ contactNum, setContactNum ] = useState( 0 );
  const [ meetingNum, setMeetingNum ] = useState( 0 );
  var lat = "";
  var lon = "";
  var city = "";



  // get geolocation of the user for weather module
  if ( "geolocation" in navigator ) {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
    } )
    if ( lat === "" || lon === "" ) {
      lat = "-37.8136";
      lon = "144.9631";
      city = "Melbourne";
    }
  } else {
    lat = "-37.8136";
    lon = "144.9631";
    city = "Melbourne";
  }

  const { data, isLoading, errorMessage } = useOpenWeather( {
    key: 'b4383fb56ad41db85770e527395fc79d',
    lat: lat,
    lon: lon,
    lang: 'en',
    unit: 'metric',
  } );

  useEffect( () => {

    async function getMeetings() {
      const serverData = await Network.fetchMeetingsNet( user );
      setMeetingNum( serverData.length )
    }

    getMeetings();

    async function getContacts() {
      const serverData = await Network.fetchContactsNet( user );
      setContactNum( serverData.length )
    }
    getContacts();



    // eslint-disable-next-line
  }, [] )


  return (
    <div className="Container">


      <div className="HomeUpper">
        <div className="Greeting">
          <div className="MainText">
            Hello { user.charAt( 0 ).toUpperCase() + user.slice( 1 ) }
          </div>
          <br />
          <div className="GreetingText">
            { greetings[ Math.floor( Math.random() * greetings.length ) ] }
          </div>

        </div>
        <div className="Weather">
          <ReactWeather
            isLoading={ isLoading }
            errorMessage={ errorMessage }
            data={ data }
            lang="en"
            locationLabel={ city }
            unitsLabels={ { temperature: '°C', windSpeed: 'Km/h' } }
            showForecast={ true }
          />
        </div>

      </div>


      <div className="HomeLower">
        <div className="CountContainer">
          <div className="Count">
            <label>
              {
                contactNum > 1
                  ? "Contacts"
                  : "Contact"
              }
              <br />
              <RiContactsBookLine size={ 40 } />
            </label>
            <div className="Num">
              { contactNum }
            </div>

          </div>

          <div className="Bar"></div>

          <div className="Count">
            <label>
              Upcoming Meetings
              <br />
              <RiVidiconLine size={ 40 } />
            </label>
            <div className="Num">
              { meetingNum }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
