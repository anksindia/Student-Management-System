using DemoApp.Interface.Repositories;
using DemoApp.domain.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;

using System.Collections.Generic;

namespace DemoApp.Services.Implementations
{
    public class StudentRepository : IStudentRepository
    {
        private readonly string _connectionString;

        public StudentRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public IEnumerable<Student> GetAllStudents()
        {
            var students = new Dictionary<int, Student>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("FrontendTable", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int studentId = reader.GetInt32(0);

                        if (!students.ContainsKey(studentId))
                        {
                            students[studentId] = new Student
                            {
                                Id = studentId,
                                Name = reader.GetString(1),
                                Address = reader.GetString(2),
                                Email = reader.GetString(3),
                                MobileNo = reader.GetString(4),
                                Subjects = new List<int>(),
                                SubjectNames = new List<string>()
                            };
                        }

                        if (!reader.IsDBNull(5))
                        {
                            students[studentId].Subjects.Add(reader.GetInt32(5));
                            students[studentId].SubjectNames.Add(reader.GetString(6));
                        }
                    }
                }
            }

            return students.Values;
        }

        public void AddStudent(Student student)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO Students (Name, Address, Email, MobileNo) OUTPUT INSERTED.Id VALUES (@Name, @Address, @Email, @MobileNo)", conn);
                cmd.Parameters.AddWithValue("@Name", student.Name);
                cmd.Parameters.AddWithValue("@Address", student.Address);
                cmd.Parameters.AddWithValue("@Email", student.Email);
                cmd.Parameters.AddWithValue("@MobileNo", student.MobileNo);

                int newStudentId = (int)cmd.ExecuteScalar();

                foreach (var subjectId in student.Subjects)
                {
                    SqlCommand subCmd = new SqlCommand("INSERT INTO StudentSubjects (StudentId, SubjectId) VALUES (@StudentId, @SubjectId)", conn);
                    subCmd.Parameters.AddWithValue("@StudentId", newStudentId);
                    subCmd.Parameters.AddWithValue("@SubjectId", subjectId);
                    subCmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateStudent(int id, Student student)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("UPDATE Students SET Name=@Name, Address=@Address, Email=@Email, MobileNo=@MobileNo WHERE Id=@Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.Parameters.AddWithValue("@Name", student.Name);
                cmd.Parameters.AddWithValue("@Address", student.Address);
                cmd.Parameters.AddWithValue("@Email", student.Email);
                cmd.Parameters.AddWithValue("@MobileNo", student.MobileNo);
                cmd.ExecuteNonQuery();

                SqlCommand delCmd = new SqlCommand("DELETE FROM StudentSubjects WHERE StudentId=@Id", conn);
                delCmd.Parameters.AddWithValue("@Id", id);
                delCmd.ExecuteNonQuery();

                foreach (var subjectId in student.Subjects)
                {
                    SqlCommand subCmd = new SqlCommand("INSERT INTO StudentSubjects (StudentId, SubjectId) VALUES (@StudentId, @SubjectId)", conn);
                    subCmd.Parameters.AddWithValue("@StudentId", id);
                    subCmd.Parameters.AddWithValue("@SubjectId", subjectId);
                    subCmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteStudent(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                SqlCommand delSub = new SqlCommand("DELETE FROM StudentSubjects WHERE StudentId=@Id", conn);
                delSub.Parameters.AddWithValue("@Id", id);
                delSub.ExecuteNonQuery();

                SqlCommand cmd = new SqlCommand("DELETE FROM Students WHERE Id=@Id", conn);
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
