using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Server.Ui.Voyager;
using HotChocolate.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using CarListGQL.Data;
using CarListGQL.GraphQL;
using Microsoft.Extensions.Logging;

namespace CarListGQL
{
    public class Startup
    {
        private readonly string AllowedOrigin = "allowedOrigin";
        public IConfiguration Configuration {get;}

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPooledDbContextFactory<ApiDbContext>(options =>
                options.UseSqlite(
                    Configuration.GetConnectionString("DefaultConnection")
                ));

            services.AddGraphQLServer()
                        .AddQueryType<Query>()
                        .AddType<ListType>()
                        .AddProjections()
                        .AddMutationType<Mutation>()
                        .AddFiltering()
                        .AddSorting()
                        .AddDiagnosticEventListener(sp =>
              new ConsoleQueryLogger(
                sp.GetApplicationService<ILogger<ConsoleQueryLogger>>()
              ));
            services.AddCors(option => {
                option.AddPolicy("allowedOrigin",
                    builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                    );
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(AllowedOrigin);

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
               endpoints.MapGraphQL();
            });

            app.UseGraphQLVoyager(new VoyagerOptions()
            {
                GraphQLEndPoint = "/graphql"
            }, "/graphql-ui");
        }
    }
}