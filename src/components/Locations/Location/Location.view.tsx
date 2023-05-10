import styles from '../Locations.module.scss';
import Route from './Route/Route.view';

interface LocationProps{
    LocationID: string;
    Name: string;
    address: string;
    NearbyLocations: Array<any>;
    deleteLocation: (id:string | undefined) => void;
    deleteNearbyLocation: (LocationID:string, nearbyID:string) => void;
    handleSelectedClick: (id:string) => void;
    selectedID: string;
}

function Location({
    LocationID,
    Name,
    address,
    NearbyLocations,
    deleteLocation,
    deleteNearbyLocation,
    handleSelectedClick,
    selectedID
}: LocationProps){


    return(
        <details className={styles.locationsAreaArrItem} key={LocationID} onClick={(id) => {handleSelectedClick(LocationID)}} style={{border: selectedID === LocationID? "1px solid #FF9900" : "1px solid white"}}>
            <summary className={styles.locationsAreaArrItemSummary}>
                <div className={styles.locationsAreaArrItemSummaryContainer}>
                    <div>
                        <div>{Name}</div>
                        <div>{address}</div>
                    </div>
                    <button title="Delete" onClick={(id) => {deleteLocation(LocationID)}}>
                        <svg  xmlns="http://www.w3.org/2000/svg" className={styles.deleteIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </summary> 
            
            <div className={styles.locationsAreaArrItemSubAreaContainer} >
              {NearbyLocations?.map((nearby: any, index) => 
                {
                    return(
                        nearby.name ?
                        <div className={styles.locationsAreaArrItemSubArea} key={index}>
                            <div>
                                <div className={styles.name}>{nearby.name}</div>
                                <div>{nearby.address}</div>
                            </div>
                            <button title="Delete" onClick={(id) => {deleteNearbyLocation(LocationID, nearby.id)}}>
                                <svg  xmlns="http://www.w3.org/2000/svg" className={styles.deleteIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        :
                        <p className={styles.locationsAreaArrItemSubArea} key={index}>
                            <Route
                                routeId={nearby.id}
                                departureLocationName={nearby.departureLocationName}
                                departureLocationAddress={nearby.departureLocationAddress}
                                destinationLocationName={nearby.destinationLocationName}
                                destinationLocationAddress={nearby.destinationLocationAddress}
                                duration={nearby.duration}
                                distance={nearby.distance}
                                travelMode={nearby.travelMode}
                                departureTimeMode={nearby.departureTimeMode}
                                departureDate={nearby.departureDate}
                                departureTime={nearby.departureTime}
                                deleteRoute={deleteLocation}
                            />
                        </p>

                    );
                }
                )
                }</div>
        </details>
    )
}

export default Location