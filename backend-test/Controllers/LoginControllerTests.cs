using FakeItEasy;
using NUnit.Framework;
using WhaleSpotting.Services;
using WhaleSpotting.Repositories;
using WhaleSpotting.Controllers;
using Microsoft.AspNetCore.Http;

namespace WhaleSpotting.Test;

public class LoginControllerTests
{
    private IAuthService _authServiceMock;
    private IUsersRepo _usersRepoMock;
    private HttpContext _httpContextMock;
    private LoginController _controller;

    [SetUp]
    public void Setup()
    {
        _authServiceMock = A.Fake<IAuthService>();
        _usersRepoMock = A.Fake<IUsersRepo>();
    }

    [Test]
    public void AuthService_IsAuthenticated_ReturnsTrueForCorrectUsernameAndPasswordCombination()
    {
        A.CallTo(() => _contextMock.Users).Returns(_usersMock);

        _controller.ControllerContext.HttpContext = _contextMock.Object;
        var actionResult = await _controller.Detail(fakeOrderId);

        var viewResult = Assert.IsType<ViewResult>(actionResult);
        Assert.IsAssignableFrom<Order>(viewResult.ViewData.Model);
    }
}