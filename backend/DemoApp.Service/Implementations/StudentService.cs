using DemoApp.Interface.Repositories;
using DemoApp.Interface.Services;
using DemoApp.Models;
using System.Collections.Generic;

namespace DemoApp.Services.Implementations
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;

        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public IEnumerable<Student> GetAllStudents() => _studentRepository.GetAllStudents();

        public void AddStudent(Student student) => _studentRepository.AddStudent(student);

        public void UpdateStudent(int id, Student student) => _studentRepository.UpdateStudent(id, student);

        public void DeleteStudent(int id) => _studentRepository.DeleteStudent(id);
    }
}
