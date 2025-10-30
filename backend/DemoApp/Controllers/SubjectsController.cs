using DemoApp.domain.Entities;
using DemoApp.Interface.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectService _subjectService;
        public SubjectsController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects()
        {
            var subjects = await _subjectService.GetAllSubjects();
            return Ok(subjects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> GetSubject(int id)
        {
            var subject = await _subjectService.GetSubject(id);
            if (subject == null) return NotFound();
            return Ok(subject);
        }

        [HttpPost]
        public async Task<IActionResult> AddSubject([FromBody] Subject subject)
        {
            await _subjectService.AddSubject(subject);
            return Ok(new { message = "Subject added successfully" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubject(int id, [FromBody] Subject subject)
        {
            await _subjectService.UpdateSubject(id, subject);
            return Ok(new { message = "Subject updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(int id)
        {
            await _subjectService.DeleteSubject(id);
            return Ok(new { message = "Subject deleted successfully" });
        }
    }
}
