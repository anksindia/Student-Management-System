using DemoApp.Interface.Repositories;
using DemoApp.Interface.Services;
using DemoApp.domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoApp.Services.Implementations
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _subjectRepository;

        public SubjectService(ISubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        public async Task<IEnumerable<Subject>> GetAllSubjects() =>
            await Task.Run(() => _subjectRepository.GetAllSubjects());
        public async Task<Subject> GetSubject(int id) =>
            await Task.Run(() => _subjectRepository.GetSubject(id));
        public async Task AddSubject(Subject subject) =>
            await Task.Run(() => _subjectRepository.AddSubject(subject));
        public async Task UpdateSubject(int id, Subject subject) =>
            await Task.Run(() => _subjectRepository.UpdateSubject(id, subject));
        public async Task DeleteSubject(int id) =>
            await Task.Run(() => _subjectRepository.DeleteSubject(id));
    }
}
