using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using WhaleSpotting.Helpers;

namespace WhaleSpotting.Controllers {
  [ApiController]
  [Route("/login")]
  public class LoginController : ControllerBase {

    private readonly IAuthService _authservice;

    private readonly IUsersRepo _userRepo;

    public LoginController(
      IAuthService authservice,
      IUsersRepo userRepo
    ) {
      _authservice = authservice;
      _userRepo = userRepo;
    }

    [HttpGet]
    public ActionResult Login([FromHeader(Name = "Authorization")] string authHeader) {
      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      if (authHeader is null)
      {
        return Unauthorized(new {Message = "Username and password must be entered."});
      }

      var encodedUsernamePassword = authHeader.Substring("Basic ".Length).Trim();
      string usernamePassword = AuthHelper.Base64Decode(encodedUsernamePassword);

      try
      {
        var check = _authservice.IsAuthenticated(usernamePassword);
        if (!check)
          return Unauthorized(new {Message = "Username and password do not match."});
        else
          return Ok();
      }
      catch (Exception)
      {
        return Unauthorized(new {Message = "Username as password not found."});
      }
    }
  }
}
