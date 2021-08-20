using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Data;
using CarListGQL.Data;
using CarListGQL.GraphQL.DataCar;
using CarListGQL.Models;

namespace CarListGQL.GraphQL
{
    public class Mutation
    {
        [UseDbContext(typeof(ApiDbContext))]
        public async Task<AddCarPayload> AddCarAsync(AddCarInput input, [ScopedService] ApiDbContext context)
        {
            var car = new CarData
            {
                Bastidor = input.bastidor,
                Modelo = input.modelo,
                Matricula = input.matricula,
                FechaEntrega = input.fechaEntrega
            };

            context.Cars.Add(car);
            await context.SaveChangesAsync();

            return new AddCarPayload(car);
        }

        [UseDbContext(typeof(ApiDbContext))]
        public async Task<EditCarPayload> EditCarAsync(EditCarInput input, [ScopedService] ApiDbContext context)
        {
            var car = context.Cars.Find(input.id);

            car.Bastidor = input.bastidor;
            car.Modelo = input.modelo;
            car.Matricula = input.matricula;
            car.FechaEntrega = input.fechaEntrega;

            context.Cars.Update(car);
            await context.SaveChangesAsync();

            return new EditCarPayload(car);
        }

        [UseDbContext(typeof(ApiDbContext))]
        public async Task<DeleteCarPayload> DeleteCarAsync(DeleteCarInput input, [ScopedService] ApiDbContext context)
        {
            var car = context.Cars.Find(input.id);
            context.Cars.Remove(car);
            await context.SaveChangesAsync();

            return new DeleteCarPayload(car);
        }
    }
}