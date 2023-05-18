using Microsoft.EntityFrameworkCore;
using WebApplication1.DataContext;
using Microsoft.OpenApi.Models;
using WebApplication4.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}

public class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
        Configuration = configuration;
        Environment = env;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        string connection = "Server=DESKTOP-GF8REUK\\SQLEXPRESS;Database=Cafe;Trusted_Connection=true;Encrypt=False";

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddDbContext<DishesContext>(options => options.UseSqlServer(connection));
        services.AddDbContext<ProvidersContext>(options => options.UseSqlServer(connection));
        services.AddDbContext<SalesContext>(options => options.UseSqlServer(connection));
        services.AddScoped<IUserAuthService, UserAuthService>();     

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.AllowAnyOrigin();
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    policy.SetIsOriginAllowed((host) => true);
                });
        });

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = Configuration["Jwt:Issuer"],
                ValidAudience = Configuration["Jwt:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("my_secret_key_1234"))
            };
        });

        if (Environment.IsDevelopment())
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My Web API", Version = "v1" });
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });
        }
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Web API v1");
                c.RoutePrefix = string.Empty;
            });
        }

        app.UseCors();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

    }
}






//var builder = WebApplication.CreateBuilder(args);

//string connection = "Server=DESKTOP-GF8REUK\\SQLEXPRESS;Database=Cafe;Trusted_Connection=true;Encrypt=False";

//builder.Services.AddDbContext<DishesContext>(options => options.UseSqlServer(connection));
//builder.Services.AddDbContext<ProvidersContext>(options => options.UseSqlServer(connection));
//builder.Services.AddDbContext<SalesContext>(options => options.UseSqlServer(connection));

//builder.Services.AddScoped<IUserAuthService, UserAuthService>();

//builder.Services.AddControllers().AddNewtonsoftJson();

//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Cafe API", Version = "v1" });
//    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//    {
//        Description = "JWT Authorization header using the Bearer scheme.",
//        Type = SecuritySchemeType.Http,
//        Scheme = "bearer"
//    });
//    c.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Type = ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            new string[] {}
//        }
//    });
//});

//var app = builder.Build();

//app.UseAuthentication();

//app.UseSwagger();
//app.UseSwaggerUI(c =>
//{
//    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cafe API V1");
//    c.RoutePrefix = string.Empty;
//});

//app.UseCors(options =>
//{
//    options.AllowAnyOrigin();
//    options.AllowAnyHeader();
//    options.AllowAnyMethod();
//    options.SetIsOriginAllowed((host) => true);
//});

//app.MapControllers();

//app.Run();