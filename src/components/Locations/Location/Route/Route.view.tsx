import styles from '../../Locations.module.scss';
import carIcon from "../../../../images/icons/car.png";
import truckIcon from "../../../../images/icons/truck.png";
import walkingIcon from "../../../../images/icons/walking.png";

interface Routeprops {
    routeId: string;
    departureLocationName: string,
    departureLocationAddress: string,
    destinationLocationName: string,
    destinationLocationAddress: string,
    duration: number;
    distance: number;
    travelMode: string;
    departureTimeMode: string;
    departureDate: string;
    departureTime: string;
    deleteRoute: (id:string | undefined) => void;
}

function Route({
    routeId,
    departureLocationName,
    departureLocationAddress,
    destinationLocationName,
    destinationLocationAddress,
    duration,
    distance,
    travelMode,
    departureTimeMode,
    departureDate,
    departureTime,
    deleteRoute
}: Routeprops){
    return(
            <div className={styles.locationsAreaArrItemSummary}>
                <div className={styles.departureDestinationContainer}>
                    <div className={styles.routeArrowContainer}>
                      <div className={styles.routeArrowStart}><div>&#9678;</div></div>
                      <div className={styles.routeArrowMiddle}> </div>
                      <div className={styles.routeArrowEnd}><div>&#9673;</div></div>
                    </div>
                    <div className={styles.departureDestinationTextContainer}>
                        <div className={styles.departure}>
                            <div>{departureLocationName}</div>
                            <div>{departureLocationAddress}</div>
                        </div>
                        <div className={styles.destination}>
                            <div>{destinationLocationName}</div>
                            <div>{destinationLocationAddress}</div>
                        </div>
                    </div>
                    <button title="Delete" onClick={(id) => {deleteRoute(routeId)}}>
                        <svg className={styles.deleteIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
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
                <div className={styles.distanceDurationContainer}>
                    <div>
                        <strong>Distance </strong> 
                        <div> {distance} km</div>  
                    </div> 
                    <div>
                        <strong>Duration</strong>
                        <div> {duration} mins</div>
                    </div>
                </div>              
                
            </div>
    )

}

export default Route;
