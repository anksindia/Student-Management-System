using DemoApp.Interface.Repositories;
using DemoApp.Interface.Services;
using DemoApp.domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoApp.Services.Implementations
{
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _repo;
        public UsersService(IUsersRepository repo) { _repo = repo; }

        public async Task<User> Register(User user)
        {
            // Business logic/validation
            if (user == null)
                throw new ArgumentException("User info required.");
            if (string.IsNullOrWhiteSpace(user.Password) || user.Password.Length < 6)
                throw new ArgumentException("Password must be at least 6 characters long.");
            if (_repo.IsEmailOrRollNumberExists(user.Email, user.RollNumber))
                throw new ArgumentException("Email or Roll Number already exists.");
            if (string.IsNullOrWhiteSpace(user.Role))
                user.Role = "User";

            // DB logic goes into repo
            return await Task.FromResult(_repo.Register(user));
        }
        public Task<User> Authenticate(LoginRequest login) => Task.FromResult(_repo.Authenticate(login));
        public Task<User> AuthenticateAdmin(LoginRequest login) => Task.FromResult(_repo.AuthenticateAdmin(login));
        public Task<IEnumerable<User>> GetAll() => Task.FromResult(_repo.GetAll());
        public Task<User> GetById(int id) => Task.FromResult(_repo.GetById(id));
        public Task Update(int id, User user) { _repo.Update(id, user); return Task.CompletedTask; }
        public Task Delete(int id) { _repo.Delete(id); return Task.CompletedTask; }
        public Task<bool> IsEmailOrRollNumberExists(string email, string rollNumber) => Task.FromResult(_repo.IsEmailOrRollNumberExists(email, rollNumber));
    }
}
