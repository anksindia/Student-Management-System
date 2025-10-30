using DemoApp.domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoApp.Interface.Services
{
    public interface IUsersService
    {
        Task<User> Register(User user);
        Task<User> Authenticate(LoginRequest login);
        Task<User> AuthenticateAdmin(LoginRequest login);
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(int id);
        Task Update(int id, User user);
        Task Delete(int id);
        Task<bool> IsEmailOrRollNumberExists(string email, string rollNumber);
    }
}
