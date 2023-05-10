// This configuration file is a single place to provide any values to set up the app

export const IDENTITY_POOL_ID = process.env.REACT_APP_IDENTITY_POOL_ID; // REQUIRED - Amazon Cognito Identity Pool ID

export const IDENTITY_POOL_ID_ROUTE = process.env.REACT_APP_IDENTITY_POOL_ID_ROUTE;

export const REGION = process.env.REACT_APP_REGION; // REQUIRED - Amazon Cognito Region

export const MAP = {
  NAME: "NearbyAppMap", // REQUIRED - Amazon Location Service map resource name
  STYLE: "Esri Street Map", // REQUIRED - String representing the style of map resource
};

export const PLACE = "NearbyNonStorage"; // REQUIRED - Amazon Location Service place index resource name

export const ROUTE = "NearbyAppRoute"; // REQUIRED - Amazon Location Service route calculator resource name
