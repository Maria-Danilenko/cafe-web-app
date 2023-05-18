using WebApplication4.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WebApplication4.Services
{
    public interface IUserAuthService
    {
        Task<string> Authenticate(string email, string password);
        Task<UserAuth> GetUserAuthByIdAsync(int id);
    }

    public class UserAuthService : IUserAuthService
    {
        private readonly List<UserAuth> _users;
        private readonly IConfiguration _configuration;

        public UserAuthService(IConfiguration configuration)
        {
            _users = new List<UserAuth>
            {
                new UserAuth { Id = 1, FirstName = "Mariia", LastName = "Danylenko", Email = "masha.danilenko666@gmail.com",
                        DateOfBirth = new DateTime(2022, 11, 12), Password = "password123", LastLogin = DateTime.Now },
            };
            _configuration = configuration;
        }

        public async Task<string> Authenticate(string email, string password)
        {
            var user = _users.FirstOrDefault(x => x.Email == email && x.Password == EncryptionService.EncryptPassword(password));

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("my_secret_key_1234");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }     

        public async Task<UserAuth> GetUserAuthByIdAsync(int id)
        {
            return await Task.FromResult(_users.FirstOrDefault(u => u.Id == id));
        }
    }
}
