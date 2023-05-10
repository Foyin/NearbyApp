import { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import PinIcon from "./PinIcon";
import styles from "./LocationMarkers.module.scss";
import { PIN_ICON_SIZE } from "../../Constants";
import { Marker as MarkerType } from "../Common/Marker";

interface LocationMarkers{
    markers: MarkerType[];
}

// Render markers with popup on map
const LocationMarkers = ({ markers }: LocationMarkers) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType>();

  
  return (
    <>
      {markers?.length > 0 && (
        <>
          {markers?.map((marker: MarkerType, index) => {
            return (
              <Marker
                latitude={marker?.latitude}
                longitude={marker?.longitude}
                offset={[0, -PIN_ICON_SIZE / 2]}
                key={index}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedMarker(marker);
                }}
                style={{"zIndex":1}}
              >
                <PinIcon label={index + 1} size={PIN_ICON_SIZE} color={marker.color} />
              </Marker>
            );
          })}

          {selectedMarker && (
            <Popup
              latitude={selectedMarker.latitude}
              longitude={selectedMarker.longitude}
              offset={[0, -PIN_ICON_SIZE]}
              closeButton={true}
              closeOnClick={true}
              onClose={() => setSelectedMarker(selectedMarker)}
              anchor="bottom"
              className={styles.popup}
            >
              <div className={styles.popup__content}>
                <div className={styles.popup__title}>
                  {selectedMarker.getPopupTitle(markers?.length)}
                </div>
                <div className={styles.popup__coordinates}>
                  {`${selectedMarker.latitude.toFixed(6)}, ${selectedMarker.longitude.toFixed(6)}`}
                </div>
              </div>
            </Popup>
          )}
        </>
      )}
    </>
  );
};

export default LocationMarkers;