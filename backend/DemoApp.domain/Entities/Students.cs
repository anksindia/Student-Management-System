namespace DemoApp.domain.Entities
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }


        public List<int> Subjects { get; set; } = new List<int>();


        public List<string> SubjectNames { get; set; } = new List<string>();
    }



    public class StudentSubject
    {
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
    }
}
