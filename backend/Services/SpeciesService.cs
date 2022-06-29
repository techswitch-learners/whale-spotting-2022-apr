using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using System.Collections.Generic;


namespace WhaleSpotting.Services
{
    public interface ISpeciesService
    {
        IEnumerable<Species> GetSpecies();
    }

    public class SpeciesService : ISpeciesService
    {
        private ISpeciesRepo _speciesRepo;

        public SpeciesService(ISpeciesRepo speciesRepo)
        {
            _speciesRepo = speciesRepo;
        }

        public IEnumerable<Species> GetSpecies()
        {
            return _speciesRepo.GetSpecies();
        }
    }
}