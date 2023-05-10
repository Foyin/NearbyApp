import { useState, useEffect } from 'react';
import './App.scss';
import Locations from './components/Locations';
import LocationsInterface from "./components/Locations/Locations.interface";
import RoutesInterface from "./components/Routes/Routes.interface";
import Map from "./components/Map/Map.view";
import axios from 'axios';

function App() {
  const [LocationList, setLocationslist] = useState<LocationsInterface[]>([]);
  const [RouteList, setRouteList] = useState<RoutesInterface[]>([]);
  const [selectedID, setSelectedID] = useState<string>("");
  const [openLocations, setOpenLocations] = useState<boolean>(false);
  const [openTutorial, setOpenTutorial] = useState<boolean>(false);
  
  /*const [userData, setUserData] = useState<{
    id: string,
    email: string
  }>({
    id: "",
    email: ""
  });
  const [signedIn, setSignedIn] = useState<boolean>(false);

  function signUp(id: string, email: string, locations: Array<any>, routes: Array<any>){
    axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      url: process.env.REACT_APP_DB_ENDPOINT,
      data: {
        id: id,
        email: email,
        locations : locations,
        routes : routes
      }
    }).then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch(error => console.error(error));
  }

  function signIn(id: string){
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_DB_ENDPOINT}/${id}`,
    }).then(response => {
      const data = response.data;
      setUserData(response.data?.Item);
      setLocationslist(response.data?.Item.locations);
      setRouteList(response.data?.Item.routes);
      setSignedIn(true);

      console.log(userData);
      console.log(response.data?.Item);
    })
    .catch(error => console.error(error));
  }

  function signOut(id: string){
    // get user by username / id
    setSignedIn(false);
    setLocationslist([]);
    setRouteList([]);
    setUserData({
      id: "",
      email: ""
    });
  }
  function deleteAccount(id: string){
    // get user by username / id
    axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_DB_ENDPOINT}/${id}`,
    }).then(response => {
      const data = response.data;
      signOut(id);
      console.log(data);
    })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    if(signedIn && userData.id !== ""){
    axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      url: process.env.REACT_APP_DB_ENDPOINT,
      data: {
        id: userData?.id,
        email: userData?.email,
        locations : LocationList,
        routes : RouteList
      }
    }).then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch(error => console.error(error))
  } else {
    return;
  }
  }, [LocationList, RouteList])
*/

  function handleOpenTutorial(){
    !openTutorial ? setOpenTutorial(true) : setOpenTutorial(false);
  }

  function handleOpenLocations(){
    !openLocations ? setOpenLocations(true) : setOpenLocations(false);
  }

  function handleSelectedClick(id:string){
    setSelectedID(id);
  }

  function addLocation(id: string, name:string,  address:string){
    let duplicate = LocationList.findIndex((t) => (
      t.name === name && t.address === address
    ));
    if(duplicate !== -1){
      return;
    }
    else{
      setLocationslist([...LocationList, {
          id: id,
          name: name,
          address: address,
          nearby:[]
          }]);
      setOpenLocations(true);
    }
  }

  function deleteLocation(id:string | undefined){
      if(selectedID === id){
        setSelectedID("");
      }
      setLocationslist(LocationList.filter(item => item?.id !== id))
      if(LocationList.length <= 1){
        setSelectedID("");
      }
  }

  function deleteNearbyLocation(LocationID:string, nearbyID:string){
      setLocationslist(LocationList.map(item => 
          item?.id === LocationID 
          ? {...item, nearby: item?.nearby.filter(item => item?.id !== nearbyID)}  
          : item));
  }

  function addNearbyLocation(LocationID:string, newNearbyLocationId: string, name:string, address:string){
    setLocationslist(LocationList.map((item: any) => 
        item?.id === LocationID 
        ? item?.nearby.findIndex((t: any) => t.name === name && t.address === address) === -1 
          ? {...item, nearby: [...item?.nearby, {"id":newNearbyLocationId, "name":name, "address": address}]}
          : item
        : item));
        setOpenLocations(true);
      }

  function addRoute(id:string,
                    departureLocationName:string, 
                    departureLocationAddress: string, 
                    destinationLocationName: string, 
                    destinationLocationAddress: string,
                    distance:number, 
                    duration:number,
                    travelMode: string,
                    departureTimeMode: string,
                    departureDate: string,
                    departureTime: string){
    let duplicate = RouteList.findIndex((t) => (
      t.departureLocationName === departureLocationName && 
      t.departureLocationAddress === departureLocationAddress &&
      t.destinationLocationName === destinationLocationName &&
      t.destinationLocationAddress === destinationLocationAddress &&
      t.travelMode === travelMode &&
      t.departureTimeMode === departureTimeMode
    ));
    if(duplicate !== -1){
      return;
    } 
    else{
    setRouteList([...RouteList, {
      id: id,
      departureLocationName: departureLocationName,
      departureLocationAddress: departureLocationAddress,
      destinationLocationName: destinationLocationName,
      destinationLocationAddress: destinationLocationAddress,
      distance: distance,
      duration: duration,
      travelMode: travelMode,
      departureTimeMode: departureTimeMode,
      departureDate: departureDate,
      departureTime: departureTime
      }]);
    }
    setOpenLocations(true);
  }

  function deleteRoute(id:string | undefined){
    setRouteList(RouteList.filter(item => item?.id !== id))

}

  function addRouteToLocation(LocationID:string, 
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
                              departureTime: string){
    setLocationslist(LocationList.map(item => 
      item?.id === LocationID 
      ? item?.nearby.findIndex((t: any) => 
        t.departureLocationName === departureLocationName && 
        t.departureLocationAddress === departureLocationAddress &&
        t.destinationLocationName === destinationLocationName &&
        t.destinationLocationAddress === destinationLocationAddress &&
        t.travelMode === travelMode &&
        t.departureTimeMode === departureTimeMode)
        ? {...item, nearby: [...item?.nearby, {id: newRouteId, 
              departureLocationName: departureLocationName,
              departureLocationAddress: departureLocationAddress,
              destinationLocationName: destinationLocationName,
              destinationLocationAddress: destinationLocationAddress,
              distance: distance,
              duration: duration,
              travelMode: travelMode,
              departureTimeMode: departureTimeMode,
              departureDate: departureDate,
              departureTime: departureTime
          }]}  
        : item
      : item));
  }

  return (
    <div className="App">
      <div className="mainArea">
        <Locations
          LocationList={LocationList}
          RouteList={RouteList}
          handleSelectedClick={handleSelectedClick}
          deleteLocation={deleteLocation}
          deleteNearbyLocation={deleteNearbyLocation}
          deleteRoute={deleteRoute}
          selectedID={selectedID}
          setSelectedID={setSelectedID}
          openLocations={openLocations}
          handleOpenLocations={handleOpenLocations}
        />
        <Map
          addLocation={addLocation}
          addNearbyLocation={addNearbyLocation}
          addRoute={addRoute}
          addRouteToLocation={addRouteToLocation}
          selectedID={selectedID}
          handleOpenLocations={handleOpenLocations}
          openLocations={openLocations}
          openTutorial={openTutorial}
          handleOpenTutorial={handleOpenTutorial}
        />
      </div>
    </div>
  );
}

export default App;