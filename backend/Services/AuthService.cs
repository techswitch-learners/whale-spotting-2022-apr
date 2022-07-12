using System;
using System.Linq;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace WhaleSpotting.Services
{
    public interface IAuthService
    {
        bool IsAuthenticated(string username, string password);
    }
    public class AuthService : IAuthService
    {
        private readonly WhaleSpottingDbContext _context;
        public AuthService(WhaleSpottingDbContext context)
        {
            _context = context;
        }
        public bool IsAuthenticated(string username, string password)
        {
            var foundUser = _context.Users.SingleOrDefault(user => user.Username == username);

            if (foundUser != null)
            {
                var foundUserSalt = foundUser.Salt;

                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: password,
                    salt: foundUserSalt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));

                return hashed == foundUser.HashedPassword;
            }
            else
                return false;
        }
    }
};
