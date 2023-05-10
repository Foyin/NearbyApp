import RouteInterface from "../Routes/Routes.interface"

export default interface LocationsInterface{
  id:string,
  name: string,
  address: string
  nearby: ({
    id:string,
    name: string,
    address: string,
  } | RouteInterface)[]
}[]