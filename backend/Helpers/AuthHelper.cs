using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace WhaleSpotting.Helpers
{
    public static class AuthHelper
    {
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public class UsernamePassword 
        {
            public string Username { get ; set; }
            public string Password { get ; set; }

            public UsernamePassword(string username, string password)
            {
                username= Username;
                password = Password;
            }
        }

        public static UsernamePassword GetUsernameAndPasswordfromAuthheader(string header)
        {

            string[] splitHeader = header.Split(" ");
            string encodedUsernameAndPassword = splitHeader[1];
            string usernameAndPassword = Base64Decode(encodedUsernameAndPassword);
            int separatorIndex = usernameAndPassword.IndexOf(':');
            string[] splitUsernamePassword = usernameAndPassword.Split(':');
            UsernamePassword usernamePassword = new UsernamePassword(splitUsernamePassword[0], splitUsernamePassword[1]);


            return usernamePassword;
        }
    }
}
