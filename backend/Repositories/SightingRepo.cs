using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface ISightingRepo
    {
        IEnumerable<Sighting> GetAllSightings();
        void DeleteById(int id);
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

        public void DeleteById(int id)
        {
            Sighting sighting = _context
               .Sightings
               .Single(s => s.Id == id);
            sighting.IsDeleted = true;
            _context.Sightings.Update(sighting);
            _context.SaveChanges();
        }
    }
}
