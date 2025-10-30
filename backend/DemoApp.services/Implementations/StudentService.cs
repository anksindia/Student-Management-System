using DemoApp.Interface.Repositories;
using DemoApp.Interface.Services;
using DemoApp.domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoApp.Services.Implementations
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;

        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async Task<IEnumerable<Student>> GetAllStudents() =>
            await Task.Run(() => _studentRepository.GetAllStudents());

        public async Task AddStudent(Student student) =>
            await Task.Run(() => _studentRepository.AddStudent(student));

        public async Task UpdateStudent(int id, Student student) =>
            await Task.Run(() => _studentRepository.UpdateStudent(id, student));

        public async Task DeleteStudent(int id) =>
            await Task.Run(() => _studentRepository.DeleteStudent(id));
    }
}
