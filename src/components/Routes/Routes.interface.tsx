export default interface RoutesInterface {
    id: string,
    departureLocationName: string,
    departureLocationAddress: string,
    destinationLocationName: string,
    destinationLocationAddress: string,
    distance: number,
    duration: number,
    travelMode: string;
    departureTimeMode: string,
    departureDate: string,
    departureTime: string
}[]