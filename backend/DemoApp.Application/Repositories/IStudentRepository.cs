namespace DemoApp.Interface.Repositories
{
    using DemoApp.domain.Entities;
    using System.Collections.Generic;

    public interface IStudentRepository
    {
        IEnumerable<Student> GetAllStudents();
        void AddStudent(Student student);
        void UpdateStudent(int id, Student student);
        void DeleteStudent(int id);
    }
}
