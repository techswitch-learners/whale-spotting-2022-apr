using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Repositories;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Helpers;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/sightings")]
    public class SightingController : ControllerBase
    {
        private readonly ISightingService _sightingService;

        private readonly ISightingRepo _sightingRepo;
        private readonly IAuthService _authService;

        public SightingController(
            ISightingService sightingService,
            ISightingRepo sightingRepo,
            IAuthService authService
        )
        {
            _sightingService = sightingService;
            _sightingRepo = sightingRepo;
            _authService = authService;
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

        [HttpPatch("{id}/approve")]
        public ActionResult<SightingResponse> ApproveSighting(
            [FromRoute] int id,
            [FromHeader] string authorization
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                string[] usernameAndPassword = AuthHelper.getUsernameAndPasswordfromAuthheader(authorization);
                if (!_authService.IsAuthenticated(usernameAndPassword))
                {
                    return Unauthorized("Username and password are not valid.");
                }
            }
            catch (Exception)
            {
                return Unauthorized("Must pass a valid authorization header.");
            }
            var sighting = _sightingService.ApproveSighting(id);
            return new SightingResponse(sighting);
        }

        [HttpGet("{id}")]
        public ActionResult<SightingResponse> GetSightingById([FromRoute] int id)
        {
            var sighting = _sightingService.GetSightingById(id);
            return new SightingResponse(sighting);
        }

        [HttpGet("/search")]
        public ActionResult<SightingListResponse> SearchSightings(
            [FromQuery] SightingSearchRequest search
        )
        {
            try
            {
                return new SightingListResponse
                {
                    Sightings = _sightingService
                        .SearchSightings(search)
                        .Select(s => new SightingResponse(s))
                        .ToList(),
                };
            }
            catch (ArgumentNullException)
            {
                return BadRequest("At least one search parameter must be given");
            }
        }

        [HttpPost("")]
        public ActionResult<SightingResponse> CreateSighting([FromBody] CreateSightingRequest newSighting)
        {
            var sighting = _sightingService.CreateSighting(newSighting);
            return new SightingResponse(sighting);
        }
    }
}
