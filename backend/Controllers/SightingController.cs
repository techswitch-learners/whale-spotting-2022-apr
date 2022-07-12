using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Repositories;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Models.Request;
using static WhaleSpotting.Helpers.AuthHelper;

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
        public ActionResult<SightingListResponse> GetApprovedSightings()
        {
            return new SightingListResponse
            {
                Sightings = _sightingService
                    .GetApprovedSightings()
                    .Select(s => new SightingResponse(s))
                    .ToList(),
            };
        }

        [HttpGet("unapproved")]
        public ActionResult<SightingListResponse> GetUnapprovedSightings([FromHeader] string authorization)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                UsernamePassword usernamePassword = GetUsernameAndPasswordfromAuthheader(authorization);
                if (!_authService.IsAuthenticated(usernamePassword.Username, usernamePassword.Password))
                {
                    return Unauthorized("Username and password are not valid.");
                }
            }
            catch (Exception)
            {
                return Unauthorized("Must pass a valid authorization header.");
            }
            return new SightingListResponse
            {
                Sightings = _sightingService
                    .GetUnapprovedSightings()
                    .Select(s => new SightingResponse(s))
                    .ToList(),
            };
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById([FromRoute] int id)
        {
            _sightingService.DeleteById(id);
            return NoContent();
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
                UsernamePassword usernamePassword = GetUsernameAndPasswordfromAuthheader(authorization);
                if (!_authService.IsAuthenticated(usernamePassword.Username, usernamePassword.Password))
                {
                    return Unauthorized("Username and password are not valid.");
                }
            }
            catch (Exception err) when (err is FormatException || err is ArgumentException || err is IndexOutOfRangeException)
            {
                return Unauthorized(err.Message);
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
