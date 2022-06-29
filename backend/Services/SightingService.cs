using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        IEnumerable<Sighting> GetAllSightings();
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
    }
}