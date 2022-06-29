using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;
namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/species")]
    public class SpeciesController : ControllerBase
    {
        private readonly ISpeciesService _speciesservice;
        public SpeciesController(ISpeciesService speciesservise)
        {
            _speciesservice = speciesservise;
        }

        [HttpGet("")]
        public ActionResult<SpeciesListResponse> GetSpecies()
        {
            var species = _speciesservice.GetSpecies();
            return new SpeciesListResponse(species);
        }
    }
}
