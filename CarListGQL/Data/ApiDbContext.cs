using Microsoft.EntityFrameworkCore;
using CarListGQL.Models;

namespace CarListGQL.Data
{
    public class ApiDbContext : DbContext
    {
        public virtual DbSet<CarData> Cars {get;set;}

        public ApiDbContext(DbContextOptions<ApiDbContext> options)
            : base(options)
        {
            
        }

        
    }
}