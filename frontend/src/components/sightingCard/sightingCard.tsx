import React from "react";
import "./sightingCard.scss";
import { Link } from "react-router-dom";
import {
  SightingResponse,
  SpeciesResponse,
} from "../../clients/internalApiClient";

interface SightingCardProps {
  // species: SpeciesResponse;
  sighting: SightingResponse;
}

export function SightingCard(props: SightingCardProps): JSX.Element {
  console.log(props.sighting.species);
  return (
    <div className="sighting-card">
      <div>{props.sighting.description}</div>
      <div>{props.sighting.date}</div>
      {props.sighting.species ? <div>{props.sighting.species.name}</div> : null}
      {/* <div>{props.species.name}</div> */}
    </div>
    // <div className="sighting-card">
    //     <img className="image" src={props.sighting.photoUrl} alt="sighting image"/>
    //     <div className="description">{props.sighting.description}</div>
    //     <div className="date">{props.sighting.date}</div>
    //     <div className="species">{props.sighting.species}</div>
    //     <Link className="sighting-page" to={`/users/${props.post.postedBy.id}`}>{props.post.postedBy.displayName}</Link>
    // </div>
  );
}
