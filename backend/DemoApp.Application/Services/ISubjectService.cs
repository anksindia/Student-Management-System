using DemoApp.domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoApp.Interface.Services
{
    public interface ISubjectService
    {
        Task<IEnumerable<Subject>> GetAllSubjects();
        Task<Subject> GetSubject(int id);
        Task AddSubject(Subject subject);
        Task UpdateSubject(int id, Subject subject);
        Task DeleteSubject(int id);
    }
}
