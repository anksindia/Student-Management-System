using DemoApp.Interface;
using DemoApp.Interface.Repositories;
using DemoApp.Interface.Services;
using DemoApp.Services.Implementations;
using Microsoft.Extensions.DependencyInjection;

namespace DemoApp.Services
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped<IStudentService, StudentService>();

            services.AddScoped<ISubjectRepository, SubjectRepository>();
            services.AddScoped<ISubjectService, SubjectService>();

            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IUsersService, UsersService>();

            return services;
        }
    }
}
