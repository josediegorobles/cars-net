using System.Linq;
using HotChocolate;
using HotChocolate.Data;
using CarListGQL.Data;
using CarListGQL.Models;

namespace CarListGQL.GraphQL
{
    public class Query
    {
        [UseDbContext(typeof(ApiDbContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<CarData> GetDatas([ScopedService] ApiDbContext context)
        {
            return context.Cars;
        }
        
    }
}