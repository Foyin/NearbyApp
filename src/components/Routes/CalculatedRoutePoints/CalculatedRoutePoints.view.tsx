import { useState, useMemo, useEffect } from "react";
import { Marker, Popup } from "react-map-gl";
import { Button } from "@aws-amplify/ui-react";
import styles from "./CalculatedRoutePoints.module.scss";
import Route from "../Route";
import carIcon from "../../../images/icons/car.png";
import truckIcon from "../../../images/icons/truck.png";
import walkingIcon from "../../../images/icons/walking.png";

interface CalculatedRoutePointsProps{
  route:  Route;
  selectedDeparturePosition: { 
    name: string,
    address: string; 
      coordinates: { 
        lng: number,
        lat: number
      } 
  };
  selectedDestinationPosition: { 
    name: string,
    address: string;
      coordinates: { 
        lng: number,
        lat: number
      } 
  };
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
  travelMode: string;
  departureTimeMode: string;
  departureDate: string;
  departureTime: string;
}

// Render calculated route points
const CalculatedRoutePoints = ({ route,
  selectedDeparturePosition, 
  selectedDestinationPosition,
  addRoute,
  addRouteToLocation,
  selectedID,
  travelMode,
  departureTimeMode,
  departureDate,
  departureTime
  }: CalculatedRoutePointsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Format data for each leg
  const calculatedPositions = useMemo(() => {
    return [
      {
        coordinates: route.Legs[0]?.StartPosition,
        distance: route.Summary.Distance,
        duration: route.Summary.DurationSeconds,
      },
      ...route?.Legs.map((leg: {
                                  StartPosition: number[];
                                  EndPosition: number[];
                                  Distance: number;
                                  DurationSeconds: number;
                                  Geometry: {
                                      LineString: never[][];
                                  }
                                }) => {
        return {
          coordinates: leg.EndPosition,
          distance: leg.Distance,
          duration: leg.DurationSeconds,
        };
      }),
    ];
  }, [route]);

  // Select first point each time route has been calculated
  useEffect(() => {
    setSelectedIndex(0);
  }, [calculatedPositions]);

  const selectedPoint = calculatedPositions[selectedIndex];
  let showpopup = true;
  const radius = 5;

  return (
    <>
      {calculatedPositions.map((point, index) => {
        return (
          <Marker
            latitude={point?.coordinates[1]}
            longitude={point?.coordinates[0]}
            key={index}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedIndex(index);
            }}
          >
            <div className={styles.point}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                <circle cx="50%" cy="50%" fill="white" r={radius} strokeWidth="2" stroke="black" />
              </svg>
            </div>
          </Marker>
        );
      })}

      {selectedPoint && (
        <Popup
          latitude={selectedPoint?.coordinates[1]}
          longitude={selectedPoint?.coordinates[0]}
          offset={[0, radius]}
          closeButton={true}
          closeOnClick={true}
          onClose={() => {
            setSelectedIndex(-1);
          }}
          anchor="top"
          className={styles.popup}
        >
          <div className={styles.popup__content}>
            <div className={styles.popup__title}>
              <b>
                {selectedIndex === 0 ? "Route Summary" : `Leg ${selectedIndex} Details`}
              </b>
            </div>
           
             {selectedDeparturePosition.address !== "" &&
              selectedDestinationPosition.address !== "" 
              ? <>
                  <div id={styles.departureDestination}>
                    <div className={styles.routeArrowContainer}>
                      <div className={styles.routeArrowStart}><div>&#9678;</div></div>
                      <div className={styles.routeArrowMiddle}> </div>
                      <div className={styles.routeArrowEnd}><div>&#9673;</div></div>
                    </div>

                    <div>
                      <div>
                          <div>{selectedDeparturePosition.name}</div>
                          <div>{selectedDeparturePosition.address}</div>
                      </div>
                      <div>
                          <div>{selectedDestinationPosition.name}</div>
                          <div>{selectedDestinationPosition.address}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.travelInfo}>
                    <div>{travelMode === "Car" ? <img src={carIcon} alt="Car"/> : 
                          travelMode === "Truck" ? <img src={truckIcon} alt="Truck"/> :
                          travelMode === "Walking" ? <img src={walkingIcon} alt="Walk"/> : ""}</div>
                    <div>{departureTimeMode === "none" ? "No" : 
                          departureTimeMode === "now" ? "With Current" :
                          departureTimeMode === "future" ? "Predicted" : ""}<br/> Traffic</div>
                    <div>{departureTime}</div>
                    <div>{departureDate}</div>
                  </div>
                  <div className={styles.distanceDuration}>
                    <div>
                      <strong>Distance</strong> 
                      <div>{Math.round(selectedPoint.distance)}</div> km
                    </div>
                    <div>
                      <strong>Duration</strong> 
                      <div>{Math.round(selectedPoint.duration / 60)} </div> min
                    </div>
                    <Button id={styles.addRouteBtn}
                            title="Add Route"
                            onClick={() => {
                              addRoute(crypto.randomUUID(),
                                      selectedDeparturePosition.name, 
                                      selectedDeparturePosition.address, 
                                      selectedDestinationPosition.name, 
                                      selectedDestinationPosition.address, 
                                      Math.round(Number(selectedPoint.distance)), 
                                      Math.round(Number(selectedPoint.duration / 60)),
                                      travelMode,
                                      departureTimeMode,
                                      departureDate,
                                      departureTime);
                              setSelectedIndex(-1);
                            }}>
                      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    <Button disabled={selectedID !== "" ? false : true}
                            id="addRouteToLocationBtn" 
                            title="Add Route To Selected Location"
                            onClick={() => {
                              addRouteToLocation(selectedID, 
                                                crypto.randomUUID(),
                                                selectedDeparturePosition.name, selectedDeparturePosition.address, 
                                                selectedDestinationPosition.name, 
                                                selectedDestinationPosition.address, 
                                                Math.round(Number(selectedPoint.distance)), 
                                                Math.round(Number(selectedPoint.duration / 60)),
                                                travelMode,
                                                departureTimeMode,
                                                departureDate,
                                                departureTime);
                              setSelectedIndex(-1);
                            }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/><path d="M18 15l-.001 3H21v2h-3.001L18 23h-2l-.001-3H13v-2h2.999L16 15h2zm-7 3v2H3v-2h8zm10-7v2H3v-2h18zm0-7v2H3V4h18z"/>
                      </svg>
                    </Button>
                  </div>
                </>
              : 
              <>
                <div className={styles.popup__title}>
                  {selectedIndex === 0 ? "Start Position" : "End Position"}
                </div>
                <div className={styles.popup__coordinates}>
                  {`${selectedPoint.coordinates[1]?.toFixed(6)}, ${selectedPoint.coordinates[0]?.toFixed(6)}`}
                </div>
                <div className={styles.distanceDuration}>
                  <div>{Math.round(selectedPoint.distance)} km</div>
                  <div>{Math.round(selectedPoint.duration / 60)} min(s)</div>
                </div>
              </>}
            
          </div>
        </Popup>
      )}
    </>
  );
};

export default CalculatedRoutePoints;