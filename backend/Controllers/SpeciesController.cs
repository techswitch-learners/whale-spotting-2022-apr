using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;
namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/species")]
    public class SpeciesController : ControllerBase
    {
        private readonly ISpeciesService _speciesService;
        public SpeciesController(ISpeciesService speciesService)
        {
            _speciesService = speciesService;
        }

        [HttpGet("")]
        public ActionResult<SpeciesListResponse> GetSpecies()
        {
            var species = _speciesService.GetSpecies();
            return new SpeciesListResponse(species);
        }
    }
}
