using System.Collections.Generic;
using System.Linq;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Response;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        List<SightingResponse> GetAllSightings();
    }

    public class SightingService : ISightingService
    {
        private ISightingRepo _sightingRepo;

        public SightingService(ISightingRepo sightingRepo)
        {
            _sightingRepo = sightingRepo;
        }

        public List<SightingResponse> GetAllSightings()
        {
            var sightings = _sightingRepo.GetAllSightings();
            return sightings.Select(sighting => new SightingResponse(sighting)).ToList();
        }
    }
}