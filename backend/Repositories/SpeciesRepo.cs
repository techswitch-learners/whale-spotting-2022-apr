using System.Collections.Generic;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface ISpeciesRepo
    {
        IEnumerable<Species> GetSpecies();
    }
    public class SpeciesRepo : ISpeciesRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public SpeciesRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Species> GetSpecies() {
            return _context.Species;
        }
    }
}