using DemoApp.domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoApp.Interface.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetAllStudents();
        Task AddStudent(Student student);
        Task UpdateStudent(int id, Student student);
        Task DeleteStudent(int id);
    }
}
