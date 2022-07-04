import "./sightingCard.scss";
import { SightingResponse } from "../../clients/internalApiClient";

interface SightingCardProps {
  sighting: SightingResponse;
}

function formatDate(dateRaw: Date) {
  const date = dateRaw.toString();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = date.substring(0, 4);
  const monthIndex = parseInt(date.substring(5, 7));
  const month = months[monthIndex - 1];
  const dayNum = parseInt(date.substring(8, 10));
  let formattedDay = "";

  if (dayNum === 1 || dayNum === 21 || dayNum === 31) {
    formattedDay = dayNum + "st";
  } else if (dayNum === 2 || dayNum === 22) {
    formattedDay = dayNum + "nd";
  } else if (dayNum === 3 || dayNum === 23) {
    formattedDay = dayNum + "rd";
  } else {
    formattedDay = dayNum + "th";
  }

  const formattedDate = `${formattedDay} ${month}, ${year}`;
  return formattedDate;
}

export function SightingCard(props: SightingCardProps): JSX.Element {
  const sighting = props.sighting;
  const species = props.sighting.species;
  const formattedDate = formatDate(sighting.date);

  return (
    <div className="sighting-card">
      <p>Description: {sighting.description}</p>
      <p>Spoted on: {formattedDate}</p>
      {species ? <div>{species.name}</div> : null}
    </div>
  );
}
