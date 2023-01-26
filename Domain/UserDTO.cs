namespace Domain
{
    public class UserDTO
    {
        public string? Id { get; set; }
        public string FirstName { get; init; } = null!;
        public string LastName { get; init; } = null!;
    }
}
