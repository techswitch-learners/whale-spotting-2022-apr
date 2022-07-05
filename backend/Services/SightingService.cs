using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        IEnumerable<Sighting> GetAllSightings();
        Sighting GetSightingById(int id);
        IEnumerable<Sighting> SearchSightings(SightingSearchRequest search);
        Sighting CreateSighting(CreateSightingRequest sighting);
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

        public Sighting GetSightingById(int id)
        {
            return _sightingRepo.GetSightingById(id);
        }
           
        public IEnumerable<Sighting> SearchSightings(SightingSearchRequest search)
        {
            return _sightingRepo.SearchSightings(search);
        }

        public Sighting CreateSighting(CreateSightingRequest sighting)
        {
            return _sightingRepo.CreateSighting(sighting);
        }
    }
}
