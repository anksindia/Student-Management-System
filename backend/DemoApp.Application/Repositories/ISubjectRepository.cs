using DemoApp.domain.Entities;
using System.Collections.Generic;

namespace DemoApp.Interface.Repositories
{
    public interface ISubjectRepository
    {
        IEnumerable<Subject> GetAllSubjects();
        Subject GetSubject(int id);
        void AddSubject(Subject subject);
        void UpdateSubject(int id, Subject subject);
        void DeleteSubject(int id);
    }
}
