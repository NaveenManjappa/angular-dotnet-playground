using Expenses.API.Data;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class AuthController(AppDbContext appDbContext) : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Register([FromBody] PostUserDto userProfile)
        {
            if (appDbContext.Users.Any(u => u.Email == userProfile.Email))
                return BadRequest("This email address is already taken");
            
            var newUser = new User { Email = userProfile.Email,Password=userProfile.Password,CreatedAt=DateTime.UtcNow,UpdatedAt=DateTime.UtcNow };

            appDbContext.Users.Add(newUser);
            appDbContext.SaveChanges();
            var token = GenerateToken(newUser);

            return Ok(new { Token=token});

        }

        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.Password)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this-is-a-very-long-lenghty-complex-hard-to-guess-and-secured-key-"));

            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer:"expensetracker.net",
                audience: "expensetracker.net",
                claims:claims,
                signingCredentials:creds,
                expires:DateTime.UtcNow.AddHours(1)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
