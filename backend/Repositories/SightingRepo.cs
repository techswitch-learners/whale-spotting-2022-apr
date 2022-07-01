using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Repositories
{
    public interface ISightingRepo
    {
        IEnumerable<Sighting> GetAllSightings();
        Sighting GetSightingById(int Id);
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
            return _context.Sightings.Include(s => s.Species);
        }

        public Sighting GetSightingById(int Id)
        {
            return _context
                .Sightings
                .Where(s => s.Id == Id)
                .Include(s => s.Species)
                .Single();
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
