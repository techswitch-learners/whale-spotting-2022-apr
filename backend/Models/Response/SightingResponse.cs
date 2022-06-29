using System;
using System.Collections.Generic;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Response
{
    public class SightingSpeciesResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LatinName { get; set; }
        public string EndangeredStatus { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }

        public SightingSpeciesResponse(Species species)
        {
            Id = species.Id;
            Name = species.Name;
            LatinName = species.LatinName;
            EndangeredStatus = species.EndangeredStatus;
            ImageUrl = species.ImageUrl;
            Description = species.Description;
        }
    }

    public class SightingResponse
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public SightingSpeciesResponse Species { get; set; }
        public bool IsApproved { get; set; }

        public SightingResponse(Sighting sighting)
        {
            Id = sighting.Id;
            Latitude = sighting.Latitude;
            Longitude = sighting.Longitude;
            Date = sighting.Date;
            Description = sighting.Description;
            PhotoUrl = sighting.PhotoUrl;
            Species = new SightingSpeciesResponse(sighting.Species);
            IsApproved = sighting.IsApproved;
        }
    }

    public class SightingListResponse
    {
        public List<SightingResponse> Sightings { get; set; }
    }
}