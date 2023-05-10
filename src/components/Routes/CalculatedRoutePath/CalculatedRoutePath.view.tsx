import { useMemo } from "react";
import { Layer, Source } from "react-map-gl"
import Route from "../Route"


interface CalculatedRoutePathProps{
  route: Route;
}

// Format route data into GeoJSON
const getGeometryJson = (legs?: any) => {
  const features = legs?.map((leg: any) => ({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: leg?.Geometry?.LineString,
    },
  }));

  return {
    type: "FeatureCollection" as "FeatureCollection",
    features,
  };
};

const linePaint = {
  "line-color": "blue",
  "line-width": 2,
  "line-offset": 1.5
};

const lineLayout = {
  "line-cap": "round" as "round",
  "line-join": "round" as "round"
};

// Render calculated route path
const CalculatedRoutePath = ({ route }: CalculatedRoutePathProps) => {
  const lineJson = useMemo(() => getGeometryJson(route?.Legs), [route]);

  return (
    <>
      <Source type="geojson" data={lineJson}>
        <Layer id="line" type="line" paint={linePaint} layout={lineLayout} />
      </Source>
    </>
  );
};

export default CalculatedRoutePath;