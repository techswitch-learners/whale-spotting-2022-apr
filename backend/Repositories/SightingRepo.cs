using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;
using System.Linq;

namespace WhaleSpotting.Repositories
{
    public interface ISightingRepo
    {
        IEnumerable<Sighting> GetAllSightings();
        Sighting GetSightingById(int Id);

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
    }
}
