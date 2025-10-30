using DemoApp.domain.Entities;
using System.Collections.Generic;

namespace DemoApp.Interface.Repositories
{
    public interface IUsersRepository
    {
        User Register(User user);
        User Authenticate(LoginRequest login);
        User AuthenticateAdmin(LoginRequest login);
        IEnumerable<User> GetAll();
        User GetById(int id);
        void Update(int id, User user);
        void Delete(int id);
        bool IsEmailOrRollNumberExists(string email, string rollNumber);
    }
}
