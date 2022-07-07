using System;

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
                Username= username;
                Password = password;
            }
        }

        public static UsernamePassword GetUsernameAndPasswordfromAuthheader(string header)
        {
            if (header.Substring(0, "Basic ".Length) != "Basic ")
            {
               throw new FormatException("Authorization header for basic authentication must begin \"Basic \""); 
            }
            string[] splitHeader = header.Split(" ");
            string encodedUsernameAndPassword = splitHeader[1];
            string usernameAndPassword;
            try
            {
                usernameAndPassword = Base64Decode(encodedUsernameAndPassword);
            }
            catch (FormatException e)
            {
                throw new FormatException("Authorization header username and password could not be decoded", e);
            }
            catch (ArgumentException e)
            {
                throw new ArgumentException("Authorization header username and password contained invalid characters", e);
            }

            
            try
            {
                string[] splitUsernamePassword = usernameAndPassword.Split(':');
                UsernamePassword usernamePassword = new UsernamePassword(splitUsernamePassword[0], splitUsernamePassword[1]);

                return usernamePassword;
            }
            catch (IndexOutOfRangeException e)
            {
                throw new IndexOutOfRangeException("Authorization header for basic authentication must contain \":\"", e);
            }    
        }
    }
}
