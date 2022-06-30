using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Repositories;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Controllers
{
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

        [HttpPost("")]
        public ActionResult<SightingResponse> CreateSighting([FromBody] CreateSightingRequest newSighting)
        {
            var sighting = _sightingService.CreateSighting(newSighting);
            return new SightingResponse(sighting);
        }
    }
}
