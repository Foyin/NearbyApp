import styles from "./Map.module.scss";
import { useState, useEffect, useLayoutEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import { LocationClient } from "@aws-sdk/client-location";
import { IDENTITY_POOL_ID, REGION, MAP, PLACE } from "../../Configuration";
import {
  ROUTES_PANEL,
  MAP_CONTAINER,
} from "../../Constants";
import PlacesLayer from "../Places/PlacesLayer.view";
import RoutesLayer from "../Routes/RoutesLayer";
import Tutorial from "../Common/Tutorial";
import { AmplifyProvider, MapView } from "@aws-amplify/ui-react";
//import  mapboxgl  from "mapbox-gl";
import { NavigationControl, GeolocateControl } from "react-map-gl";
import { theme } from "../../Theme";
import "@aws-amplify/ui-react/styles.css";


interface MapProps{
  addLocation: (id: string, name:string, address:string) => void;
  addNearbyLocation: (LocationID:string, newNearbyLocationId: string, name:string, address:string) => void;
  addRoute: (id:string,
            departureLocationName:string, 
            departureLocationAddress: string, 
            destinationLocationName: string, 
            destinationLocationAddress: string,
            distance:number, 
            duration:number,
            travelMode: string,
            departureTimeMode: string,
            departureDate: string,
            departureTime: string) => void;
  addRouteToLocation: (LocationID:string, 
                      newRouteId:string,
                      departureLocationName:string, 
                      departureLocationAddress: string, 
                      destinationLocationName: string, 
                      destinationLocationAddress: string,
                      distance:number, 
                      duration:number,
                      travelMode: string,
                      departureTimeMode: string,
                      departureDate: string,
                      departureTime: string) => void;
  selectedID: string;
  handleOpenLocations: () => void;
  openLocations: boolean;
  openTutorial: boolean;
  handleOpenTutorial: () => void;

}

Amplify.configure({
    Auth: {
      identityPoolId: IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
      region: REGION, // REQUIRED - Amazon Cognito Region
    },
    geo: {
      AmazonLocationService: {
        maps: {
          items: {
            [MAP.NAME]: {
              // REQUIRED - Amazon Location Service Map resource name
              style: MAP.STYLE, // REQUIRED - String representing the style of map resource
            },
          },
          default: MAP.NAME, // REQUIRED - Amazon Location Service Map resource name to set as default
        },
        search_indices: {
          items: [PLACE], // REQUIRED - Amazon Location Service Place Index name
          default: PLACE, // REQUIRED - Amazon Location Service Place Index name to set as default
        },
        region: REGION, // REQUIRED - Amazon Location Service Region
      },
    },
  });
  // eslint-disable-next-line import/no-webpack-loader-syntax
  //mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


function Map({
  addLocation,
  addNearbyLocation,
  addRoute,
  addRouteToLocation,
  selectedID,
  handleOpenLocations,
  openLocations,
  openTutorial,
  handleOpenTutorial
  }: MapProps){
        const [initialViewState, setInitialViewState] = useState<{
          longitude: number,
          latitude: number,
          zoom: number,
      }>({
          longitude: -123.1187,
          latitude: 49.2819,
          zoom: 15,
      });
        const [credentials, setCredentials] = useState<any>();
        const [client, setClient] = useState<any>();
        const [clickedLngLat, setClickedLngLat] = useState<{ lng: number; lat: number; } | undefined>();
        const [openedPanel, setOpenedPanel] = useState<string>();
        //const [openedInfoBox, setOpenedInfoBox] = useState();
        const [selectedDeparturePosition, setSelectedDeparturePosition] = useState<{
          name: string,
          address: string; 
          coordinates: { 
            lng: number,
            lat: number
          }
          }>({
          name: "",
          address: "",
          coordinates:{ 
            lng: 0,
            lat: 0
          }
          });
        const [selectedDestinationPosition, setSelectedDestinationPosition] = useState<{
          name: string,
          address: string; 
          coordinates: { 
            lng: number,
            lat: number
          }
          }>({
          name: "",
          address: "",
          coordinates:{ 
            lng: 0,
            lat: 0
          }
          });

          const departureBtn = document.getElementById('departure') as HTMLButtonElement;
          const destinationBtn = document.getElementById('destination') as HTMLButtonElement;

          if(departureBtn !== null){
            if (selectedDeparturePosition.address !== ""){
              destinationBtn.disabled = false;
              departureBtn.disabled = true;
            }
            departureBtn.onclick = () => {
              setSelectedDeparturePosition({
                name: departureBtn.parentNode?.parentNode?.children[0]?.innerHTML!, 
                address: departureBtn.parentNode?.parentNode?.children[1]?.innerHTML!, 
                coordinates: {
                  lat: Number(departureBtn?.parentNode?.parentNode?.children[2]?.innerHTML!.split(",")[0]), 
                  lng: Number(departureBtn?.parentNode?.parentNode?.children[2]?.innerHTML!.split(",")[1])
                }
              });
            }
          }

          if(destinationBtn !== null){
              destinationBtn.onclick = () => {
                if (selectedDeparturePosition.address !== ""){
                setSelectedDestinationPosition({
                  name: departureBtn.parentNode?.parentNode?.children[0]?.innerHTML!, 
                  address: destinationBtn.parentNode?.parentNode?.children[1]?.innerHTML!, 
                  coordinates: {
                    lat: Number(destinationBtn?.parentNode?.parentNode?.children[2]?.innerHTML!.split(",")[0]), 
                    lng: Number(destinationBtn?.parentNode?.parentNode?.children[2]?.innerHTML!.split(",")[1])
                  }
                });
                openedPanel ? handlePanelChange("") : handlePanelChange(ROUTES_PANEL);
              }
            }
          }
        
        // HTML in PlacesLayer
        

        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition, handleError);
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
        }
      
        function handleError(error: any) {
          let errorStr;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorStr = 'User denied the request for Geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorStr = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorStr = 'The request to get user location timed out.';
              break;
            case error.UNKNOWN_ERROR:
              errorStr = 'An unknown error occurred.';
              break;
            default:
              errorStr = 'An unknown error occurred.';
          }
          console.error('Error occurred: ' + errorStr);
        }
      
        function setPosition(position: any) {
          setInitialViewState({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            zoom: 15,
          })
        }
        
        useLayoutEffect(() => {
          getLocation();
        }, [initialViewState]);

        //Fetch credentials when the app loads
        useEffect(() => {
          const fetchCredentials = async () => {
            // Fetch AWS credentials from Amazon Cognito using Amplify Auth and storing it in state
            setCredentials(await Auth.currentUserCredentials());
          };
          fetchCredentials();
        }, []);
      
        // Instantiate client for aws-sdk whenever the credentials change
        useEffect(() => {
          if (credentials != null) {
            // Instantiate client for aws-sdk method calls
            const client = new LocationClient({
              credentials,
              region: REGION,
            });
      
            setClient(client);
          }
        }, [credentials]);
      
        // Store coordinates of clicked position on the map
        const handleMapClick = (e: any) => {
          if (e.lngLat) {
            setClickedLngLat(e.lngLat);
          }
        };
      
        // Update state of the currently opened panel
        const handlePanelChange = (panel: string) => {
          setOpenedPanel(panel);
        };

        const handleResetDepartureDestination = () => {
          setSelectedDeparturePosition({
            name: "",
            address: "",
            coordinates:{ 
              lng: 0,
              lat: 0
            }
            })
          setSelectedDestinationPosition({
            name: "",
            address: "",
            coordinates:{ 
              lng: 0,
              lat: 0
            }
            })
            if(destinationBtn !== null){
              destinationBtn.disabled = false;
            }
            if(departureBtn !== null){
              departureBtn.disabled = false;
            }
          }
    return(
        <div id={"mapArea"} className={styles.mapArea} >
            <AmplifyProvider theme={theme}>
              
                {client ? (
                    <MapView
                        id={MAP_CONTAINER}
                        style={{"width":"100%", "height":"100vh"}}
                        initialViewState={initialViewState}
                        mapStyle={MAP.NAME}
                        onClick={handleMapClick}
                        maxZoom={16}
                    >
                    <button className={styles.placesBtn} onClick={() => {handleOpenLocations()}}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.icon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
    
                      Places
                    </button>
                    <button className={styles.tutorialBtn} onClick={() => handleOpenTutorial()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.icon}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                        How To Use
                    </button>
                    {openTutorial ? <Tutorial/> : <></>}
                    <NavigationControl position="bottom-right" />
                    <GeolocateControl 
                      showUserLocation={true}
                      showUserHeading={true} 
                      position="bottom-right"/>
                    <PlacesLayer 
                      addLocation={addLocation}
                      addNearbyLocation={addNearbyLocation}
                      selectedID={selectedID}
                    />
                    <RoutesLayer
                      client={client}
                      clickedLngLat={clickedLngLat}
                      isOpenedPanel={openedPanel === ROUTES_PANEL ? true : false}
                      onPanelChange={handlePanelChange}
                      selectedDeparturePosition={selectedDeparturePosition}
                      selectedDestinationPosition={selectedDestinationPosition}
                      handleResetDepartureDestination={handleResetDepartureDestination}
                      addRoute={addRoute}
                      addRouteToLocation={addRouteToLocation}
                      selectedID={selectedID}
                  />
                    </MapView>
                ) : (
                  <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                )}
                </AmplifyProvider>
                {
                 
                }
        </div>
    );
}

export default Map; 