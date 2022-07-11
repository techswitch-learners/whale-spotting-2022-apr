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
                string[] splitHeader = authorization.Split(" ");
                string encodedUsernameAndPassword = splitHeader[1];
                byte[] usernameAndPasswordBytes = Convert.FromBase64String(
                    encodedUsernameAndPassword
                );
                string usernameAndPassword = System.Text.Encoding.UTF8.GetString(
                    usernameAndPasswordBytes
                );
                if (!_authService.IsAuthenticated(usernameAndPassword))
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
                AuthHelper.UsernamePassword usernamePassword = AuthHelper.GetUsernameAndPasswordfromAuthheader(authorization);
                
                if (!_authService.IsAuthenticated(usernamePassword.Username, usernamePassword.Password))
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
