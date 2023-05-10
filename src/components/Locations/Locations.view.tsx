import React from 'react';
import Location from "./Location";
import Route from "./Location/Route/Route.view";
import styles from "./Locations.module.scss";
import LocationsInterface from "./Locations.interface";
import RoutesInterface from "../Routes/Routes.interface";
import titleLogo from '../../images/nearbyBlue.png';

interface LocationsProps{
  LocationList: LocationsInterface[];
  RouteList: RoutesInterface[];
  selectedID: string;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  handleSelectedClick: (id:string) => void;
  deleteLocation: (id:string | undefined) => void;
  deleteNearbyLocation: (LocationID:string, nearbyID:string) => void;
  deleteRoute: (id:string | undefined) => void;
  openLocations: boolean;
  handleOpenLocations: () => void;
}

function Locations({
  LocationList,
  RouteList,
  handleSelectedClick,
  deleteLocation,
  deleteNearbyLocation,
  deleteRoute,
  selectedID,
  setSelectedID,
  openLocations,
  handleOpenLocations
} :LocationsProps){ 
     
    return(
      openLocations === true ?
          <div className={styles.locationsContainer}>
             
              <div className={styles.locationsArea}>
                  {LocationList.length !== 0 ?
                  LocationList?.map((item: LocationsInterface, index) => 
                      {return (
                              <Location
                                  key={index}
                                  LocationID={item.id}
                                  Name={item.name}
                                  address={item.address}
                                  NearbyLocations={item.nearby}
                                  deleteLocation={deleteLocation}
                                  deleteNearbyLocation={deleteNearbyLocation}
                                  handleSelectedClick={handleSelectedClick}
                                  selectedID={selectedID}
                              />
                      );}
                  )
                  :
                  <div className={styles.listPlaceholder}>No Places Added</div>
                }
              </div>
              <div className={styles.locationsArea}>
                  {RouteList.length !== 0 ?
                    RouteList?.map((item: RoutesInterface, index) => 
                        {return (
                        <div key={index} className={styles.locationsAreaArrItem}>
                                <Route
                                  routeId={item.id}
                                  departureLocationName={item.departureLocationName}
                                  departureLocationAddress={item.departureLocationAddress}
                                  destinationLocationName={item.destinationLocationName}
                                  destinationLocationAddress={item.destinationLocationAddress}
                                  duration={item.duration}
                                  distance={item.distance}
                                  deleteRoute={deleteRoute}
                                  travelMode={item.travelMode}
                                  departureTimeMode={item.departureTimeMode}
                                  departureDate={item.departureDate}
                                  departureTime={item.departureTime}
                                />
                        </div>
                        );}
                    )
                    :
                    <div className={styles.listPlaceholder}>No Routes Added</div>
                  }
              </div>
          </div>
          :<></>
    )
}

export default Locations;