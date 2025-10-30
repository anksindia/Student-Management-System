using DemoApp.Interface.Repositories;
using DemoApp.domain.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace DemoApp.Services.Implementations
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly string _connectionString;

        public SubjectRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public IEnumerable<Subject> GetAllSubjects()
        {
            var subjects = new List<Subject>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("SELECT Id, Subject FROM Subjects", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        subjects.Add(new Subject
                        {
                            Id = reader.GetInt32(0),
                            SubjectName = reader.GetString(1)
                        });
                    }
                }
            }
            return subjects;
        }

        public Subject GetSubject(int id)
        {
            Subject subject = null;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("SELECT Id, Subject FROM Subjects WHERE Id=@Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        subject = new Subject
                        {
                            Id = reader.GetInt32(0),
                            SubjectName = reader.GetString(1)
                        };
                    }
                }
            }
            return subject;
        }

        public void AddSubject(Subject subject)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("INSERT INTO Subjects (Subject) VALUES (@Subject)", conn);
                cmd.Parameters.AddWithValue("@Subject", subject.SubjectName);
                cmd.ExecuteNonQuery();
            }
        }

        public void UpdateSubject(int id, Subject subject)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var cmd = new SqlCommand("UPDATE Subjects SET Subject=@Subject WHERE Id=@Id", conn);
                cmd.Parameters.AddWithValue("@Subject", subject.SubjectName);
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.ExecuteNonQuery();
            }
        }

        public void DeleteSubject(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                var delCmd = new SqlCommand("DELETE FROM StudentSubjects WHERE SubjectId=@Id", conn);
                delCmd.Parameters.AddWithValue("@Id", id);
                delCmd.ExecuteNonQuery();

                var cmd = new SqlCommand("DELETE FROM Subjects WHERE Id=@Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
