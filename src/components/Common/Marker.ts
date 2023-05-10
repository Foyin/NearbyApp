export class Marker {
  coordinates: [number, number];
  longitude: number;
  latitude: number;
  index: number;
  color: string;
    constructor(coordinates: {lng: number, lat: number}, index: number) {
      this.setCoordinates(coordinates);
      this.longitude = coordinates?.lng;
      this.latitude = coordinates?.lat;
      this.index = index;
      this.color = "#3eb0ce";
    }
  
    setCoordinates(coordinates: {lng: number, lat: number}) {
      this.coordinates = [coordinates?.lng, coordinates?.lat];
    }
  
    getPopupTitle(totalMarkersLength: number) {
      if (this.index === 0) {
        return "Departure Position";
      } else if (this.index === totalMarkersLength - 1) {
        return "Destination Position";
      } else {
        return "Waypoint Position";
      }
    }
  }