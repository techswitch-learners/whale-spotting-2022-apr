using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using static WhaleSpotting.Helpers.AuthHelper;

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

      UsernamePassword usernamePassword = GetUsernameAndPasswordfromAuthheader(authHeader);

      try
      {
        var check = _authservice.IsAuthenticated(usernamePassword.Username, usernamePassword.Password);
        if (!check)
          return Unauthorized(new {Message = "Username and password do not match."});
        else
          return Ok();
      }
      catch (Exception)
      {
        return Unauthorized(new {Message = "Username and password not found."});
      }
    }
  }
}
