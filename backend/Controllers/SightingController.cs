using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Repositories;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/sightings")]
    public class SightingController : ControllerBase
    {
        private readonly ISightingService _sightingService;

        private readonly ISightingRepo _sightingRepo;

        public SightingController(ISightingService sightingService, ISightingRepo sightingRepo)
        {
            _sightingService = sightingService;
            _sightingRepo = sightingRepo;
        }

        [HttpGet("")]
        public ActionResult<SightingListResponse> GetAllSightings()
        {
            return new SightingListResponse
            {
                Sightings = _sightingService
                    .GetAllSightings()
                    .Select(s => new SightingResponse(s))
                    .ToList(),
            };
        }

        [HttpGet("{id}")]
        public ActionResult<SightingResponse> GetSightingById([FromRoute] int id)
        {
            var sighting = _sightingService.GetSightingById(id);
            return new SightingResponse(sighting);
        }
        
        [HttpPost("")]
        public ActionResult<SightingResponse> CreateSighting([FromBody] CreateSightingRequest newSighting)
        {
            var sighting = _sightingService.CreateSighting(newSighting);
            return new SightingResponse(sighting);
        }
    }
}
