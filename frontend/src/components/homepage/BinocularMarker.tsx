import Leaflet from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { svgPathData } from "@fortawesome/free-solid-svg-icons/faBinoculars";
import { SightingResponse } from "../../clients/internalApiClient";

const svgIcon = Leaflet.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="${svgPathData}"/></svg>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 0],
});

interface BinocularMarkerProps {
  sighting: SightingResponse;
}

export const BinocularMarker: React.FunctionComponent<BinocularMarkerProps> = ({
  sighting,
}) => {
  return (
    <Marker
      position={[sighting.latitude, sighting.longitude]}
      icon={svgIcon}
      data-testid="marker"
    >
      <Popup>{sighting.description}</Popup>
    </Marker>
  );
};
