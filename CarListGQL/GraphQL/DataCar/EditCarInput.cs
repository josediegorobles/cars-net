namespace CarListGQL.GraphQL.DataCar
{
    public record EditCarInput(int id, string matricula, string bastidor, string modelo, string fechaEntrega);
}