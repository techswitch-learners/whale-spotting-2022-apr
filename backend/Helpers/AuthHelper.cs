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

        public static string[] getUsernameAndPasswordfromAuthheader(string header)
        {
            string[] splitHeader = header.Split(" ");
            string encodedUsernameAndPassword = splitHeader[1];
            string usernameAndPassword = Base64Decode(encodedUsernameAndPassword);
            int separatorIndex = usernameAndPassword.IndexOf(':');
            var splitUsernamePassword = usernameAndPassword.Split(':');

            return splitUsernamePassword;
        }
    }
}
