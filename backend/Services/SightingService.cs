using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        IEnumerable<Sighting> GetAllSightings();
        Sighting CreateSighting(CreateSightingRequest sighting);
        public int CountAllSightings();
    }

    public class SightingService : ISightingService
    {
        private ISightingRepo _sightingRepo;

        public SightingService(ISightingRepo sightingRepo)
        {
            _sightingRepo = sightingRepo;
        }

        public IEnumerable<Sighting> GetAllSightings()
        {
            return _sightingRepo.GetAllSightings();
        }

        public Sighting CreateSighting(CreateSightingRequest sighting)
        {
            return _sightingRepo.CreateSighting(sighting);
        }

        public int CountAllSightings()
        {
            return _sightingRepo.CountAllSightings();
        }
    }
}
