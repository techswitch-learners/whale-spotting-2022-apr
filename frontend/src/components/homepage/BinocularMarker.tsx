import Leaflet from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { svgPathData } from "@fortawesome/free-solid-svg-icons/faBinoculars";
import { SightingResponse } from "../../clients/internalApiClient";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const svgIcon = Leaflet.divIcon({
  html: `<svg role="marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="${svgPathData}"  /></svg>`,
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
  const formattedDate = format(parseISO(sighting.date), "do MMMM, yyyy");

  let speciesSection = <></>;

  if (sighting.species) {
    speciesSection = <>{sighting.species.name}</>;
  }

  return (
    <Marker position={[sighting.latitude, sighting.longitude]} icon={svgIcon}>
      <Popup>
        <Link to={`/sightings/${sighting.id}`}>
          {speciesSection}

          {sighting.date && (
            <>
              <br />
              {formattedDate}
            </>
          )}

          {sighting.description && (
            <>
              <br />
              {sighting.description}
            </>
          )}

          {sighting.photoUrl && (
            <>
              <br />
              <img src={sighting.photoUrl} className="w-100" />
            </>
          )}
        </Link>
      </Popup>
    </Marker>
  );
};
