using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Util;

namespace WhaleSpotting.Repositories
{
    public interface ISightingRepo
    {
        IEnumerable<Sighting> GetAllSightings();
        IEnumerable<Sighting> SearchSightings(SightingSearchRequest search);
        Sighting CreateSighting(CreateSightingRequest sighting);
    }

    public class SightingRepo : ISightingRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public SightingRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Sighting> GetAllSightings()
        {
            return _context
                .Sightings
                .Include(s => s.Species);
        }

        public IEnumerable<Sighting> SearchSightings(SightingSearchRequest search)
        {
            IEnumerable<Sighting> searchResult = _context
                .Sightings
                .Include(s => s.Species);

            if (
                search.SpeciesId == null &&
                search.FromDate == null &&
                search.ToDate == null &&
                search.latitude == null &&
                search.longitude == null &&
                search.radius == null
            )
            {
                throw new ArgumentNullException("search", "At least one of the properties of the search object should be non-null");
            }

            if (search.SpeciesId != null)
            {
                searchResult = searchResult
                    .Where(s => s.Species != null)
                    .Where(s => s.Species.Id == search.SpeciesId);
            }
            

            if (search.FromDate != null)
            {
                searchResult = searchResult
                    .Where(s => s.Date.CompareTo(search.FromDate) >= 0);
            }

            if (search.ToDate != null)
            {
                searchResult = searchResult
                    .Where(s => s.Date.CompareTo(search.ToDate) <= 0);
            }

            if (search.latitude != null && search.longitude != null && search.radius != null)
            {
                searchResult = searchResult
                    .Where(s => GeographyHelpers.Distance(search.latitude.Value, s.Latitude, search.longitude.Value, s.Longitude) <= search.radius);
            }
            return searchResult;
        }

        public Sighting CreateSighting(CreateSightingRequest sighting)
        {
            Sighting newSighting = new Sighting
            {
                Date = sighting.Date,
                Latitude = sighting.Latitude,
                Longitude = sighting.Longitude,
                Description = sighting.Description,
                PhotoUrl = sighting.PhotoUrl
            };
            if (sighting.SpeciesId != 0)
            {
                Species species = _context
                    .Species
                    .Where(a => a.Id == sighting.SpeciesId)
                    .Single();
                newSighting.Species = species;
            }

            var insertedSighting = _context.Sightings.Add(newSighting);
            _context.SaveChanges();
            return insertedSighting.Entity;
        }
    }
}
