using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Repositories
{
    public interface ISightingRepo
    {
        IEnumerable<Sighting> GetAllSightings();
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
                .Sightings;
        }
    }
}
