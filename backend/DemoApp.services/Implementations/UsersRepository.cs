using DemoApp.Interface.Repositories;
using DemoApp.domain.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace DemoApp.Services.Implementations
{
    public class UsersRepository : IUsersRepository
    {
        private readonly string _connectionString;
        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public bool IsEmailOrRollNumberExists(string email, string rollNumber)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            string checkUser = "SELECT COUNT(*) FROM Users WHERE Email=@Email OR RollNumber=@RollNumber";
            using var checkCmd = new SqlCommand(checkUser, connection);
            checkCmd.Parameters.AddWithValue("@Email", email);
            checkCmd.Parameters.AddWithValue("@RollNumber", rollNumber);
            int exists = (int)checkCmd.ExecuteScalar();
            return exists > 0;
        }

        public User Register(User user)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            string query = @"INSERT INTO Users (Name, RollNumber, Email, Password, Role)
                             OUTPUT INSERTED.Id
                             VALUES (@Name, @RollNumber, @Email, @Password, @Role)";
            using var cmd = new SqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Name", user.Name);
            cmd.Parameters.AddWithValue("@RollNumber", user.RollNumber);
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@Password", user.Password);
            cmd.Parameters.AddWithValue("@Role", user.Role ?? "User");
            user.Id = (int)cmd.ExecuteScalar();
            return user;
        }

        public User Authenticate(LoginRequest login)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            string query = "SELECT Id, Name, RollNumber, Email, Role FROM Users WHERE Email=@Email AND Password=@Password";
            using var cmd = new SqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Email", login.Email);
            cmd.Parameters.AddWithValue("@Password", login.Password);
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new User
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    RollNumber = reader["RollNumber"].ToString(),
                    Email = reader["Email"].ToString(),
                    Role = reader["Role"].ToString(),
                };
            }
            return null;
        }

        public User AuthenticateAdmin(LoginRequest login)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            string query = "SELECT Id, Name, RollNumber, Email, Role FROM Users WHERE Email=@Email AND Password=@Password AND Role='Admin'";
            using var cmd = new SqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Email", login.Email);
            cmd.Parameters.AddWithValue("@Password", login.Password);
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new User
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    RollNumber = reader["RollNumber"].ToString(),
                    Email = reader["Email"].ToString(),
                    Role = reader["Role"].ToString(),
                };
            }
            return null;
        }

        public IEnumerable<User> GetAll()
        {
            var users = new List<User>();
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            string query = "SELECT Id, Name, RollNumber, Email, Password, Role FROM Users";
            using var cmd = new SqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                users.Add(new User
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    RollNumber = reader["RollNumber"].ToString(),
                    Email = reader["Email"].ToString(),
                    Password = reader["Password"].ToString(),
                    Role = reader["Role"].ToString()
                });
            }
            return users;
        }

        public User GetById(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            string query = "SELECT Id, Name, RollNumber, Email, Password, Role FROM Users WHERE Id=@Id";
            using var cmd = new SqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new User
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    RollNumber = reader["RollNumber"].ToString(),
                    Email = reader["Email"].ToString(),
                    Password = reader["Password"].ToString(),
                    Role = reader["Role"].ToString()
                };
            }
            return null;
        }

        public void Update(int id, User user)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            string query = @"UPDATE Users SET Name=@Name, RollNumber=@RollNumber, Email=@Email, Password=@Password WHERE Id=@Id";
            using var cmd = new SqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@Name", user.Name);
            cmd.Parameters.AddWithValue("@RollNumber", user.RollNumber);
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@Password", user.Password);
            cmd.ExecuteNonQuery();
        }

        public void Delete(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();
            string query = "DELETE FROM Users WHERE Id=@Id";
            using var cmd = new SqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.ExecuteNonQuery();
        }
    }
}
