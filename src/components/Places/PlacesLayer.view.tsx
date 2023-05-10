import { Geocoder } from "@aws-amplify/ui-react";
import { renderToString } from "react-dom/server";
import PinIcon from "../Common/PinIcon";
import styles from "./PlacesLayer.module.scss";
import '@aws-amplify/ui-react/styles.css';
import { PIN_ICON_SIZE } from "../../Constants";

interface PlacesLayer{
  addLocation: (id: string, name:string, address:string) => void;
  addNearbyLocation: (LocationID:string, newNearbyLocationId: string, name:string, address:string) => void;
  selectedID:string;
}

// Layer in the app that contains Places functionalities
const PlacesLayer = ({
  addLocation,
  addNearbyLocation,
  selectedID
  } : PlacesLayer) => {

//Max search results
const MAX_RESULT = 9;

// Override default popup offset
const popup = { offset: [0, -PIN_ICON_SIZE], anchor: "bottom"};

// Override default marker icon
const icon = document.createElement("div");

icon.innerHTML = renderToString(
  <PinIcon size={PIN_ICON_SIZE} color={"#050659"} />
);
const markerIcon = { element: icon, offset: [0, -PIN_ICON_SIZE / 2] };

const addBtn = document.getElementById('addBtn') as HTMLButtonElement;


if (addBtn !== null ){
  addBtn.onclick = (e) => {
    addLocation(crypto.randomUUID(), addBtn.parentNode?.parentNode?.children[0]?.innerHTML!, addBtn.parentNode?.parentNode?.children[1]?.innerHTML!)
  }
}

const addNearbyBtn = document.getElementById('addNearby')  as HTMLButtonElement;

if (addNearbyBtn !== null){
  if (selectedID !== ""){
    addNearbyBtn.disabled = false;
  }
  addNearbyBtn.onclick = () => {
    addNearbyLocation(selectedID, crypto.randomUUID(), addNearbyBtn.parentNode?.parentNode?.children[0]?.innerHTML!, addNearbyBtn.parentNode?.parentNode?.children[1]?.innerHTML!)
  }
}


// Override search box's default style
const render = (item: any) => {
  // render as a search result
  let placeName = item?.place_name.split(",");
  return renderToString(
    <a>
      <div id="searchItem" className="mapboxgl-ctrl-geocoder--result maplibregl-ctrl-geocoder--result">
        <div>
          <div className="mapboxgl-ctrl-geocoder--result-title maplibregl-ctrl-geocoder--result-title">
            {placeName[0]}
          </div>
          <div className="mapboxgl-ctrl-geocoder--result-address maplibregl-ctrl-geocoder--result-address">
            {placeName.splice(1, placeName.length).join(",")}
          </div>
        </div>
      </div>
    </a>
  );
};

const popupRender = (item:any) => {
  let placeName = item?.place_name.split(",");
  return renderToString(
    <div className={styles.popup}>
      <div className={styles.popup__content}>
        <div className={styles.popup__title}>{placeName[0]}</div>
        <div>{placeName.splice(1, placeName.length).join(",")}</div>
        <div className={styles.popup__coordinates}>
          {`${item.center[1].toFixed(6)}, ${item.center[0].toFixed(6)}`}
        </div>
        <div className={styles.btnContainer}>
          <button id="addBtn" title="Add Location">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" width="24" height="24">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <button id="addNearby" disabled title="Add Nearby Location To Selected">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/><path d="M18 15l-.001 3H21v2h-3.001L18 23h-2l-.001-3H13v-2h2.999L16 15h2zm-7 3v2H3v-2h8zm10-7v2H3v-2h18zm0-7v2H3V4h18z"/>
            </svg>
          </button>
          <button id="departure" title="Set Departure location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/><path d="M9.975 8.975a3.5 3.5 0 1 0-4.95 0L7.5 11.45l2.475-2.475zM7.5 14.278L3.61 10.39a5.5 5.5 0 1 1 7.78 0L7.5 14.28zM7.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 12.45l2.475-2.475a3.5 3.5 0 1 0-4.95 0L16.5 20.45zm3.89-1.06l-3.89 3.888-3.89-3.889a5.5 5.5 0 1 1 7.78 0zM16.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          </button>
          <button id="destination" disabled title="Set Destination location"> 
            <svg onClick={() => alert("yo")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/><path d="M11.39 10.39L7.5 14.277 3.61 10.39a5.5 5.5 0 1 1 7.78 0zM7.5 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12.89 10.89l-3.89 3.888-3.89-3.889a5.5 5.5 0 1 1 7.78 0zM16.5 17.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
            </svg>
          </button> 
        </div>
      </div>
    </div>
  )
}
  return (
    <Geocoder
      position="top-left"
      placeholder="Search Places"
      showResultsWhileTyping={true}
      showResultMarkers={markerIcon}
      popup={popup}
      popupRender={popupRender}
      limit={MAX_RESULT}
      marker={markerIcon}
    >
    </Geocoder>
  );
};

export default PlacesLayer;