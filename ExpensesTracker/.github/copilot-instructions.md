# Copilot Coding Agent Instructions for ExpensesTracker API

## Project Overview
- This is a .NET 8 Web API for expense tracking, located in `Expenses.API/`.
- Main components: Controllers (`Controllers/`), Data access (`Data/`), DTOs (`Dtos/`), Models (`Models/`), Migrations (`Migrations/`).
- Data flows from HTTP requests (Controllers) → Service layer (`Data/Services/`) → Entity Framework Core (`AppDbContext.cs`) → SQL Server DB.

## Key Workflows
- **Build:** Use `dotnet build Expenses.API.sln` from the workspace root.
- **Run:** Use `dotnet run --project Expenses.API/Expenses.API.csproj`.
- **Migrations:** Managed via EF Core. Migration files are in `Migrations/`. Use `dotnet ef migrations add <Name>` and `dotnet ef database update`.
- **Debug:** Launch profiles in `Properties/launchSettings.json`.

## Patterns & Conventions
- **Controllers** handle HTTP endpoints, delegate business logic to services.
- **Service Layer** (`Data/Services/`) encapsulates business logic and data access.
- **DTOs** in `Dtos/` are used for request/response payloads, not for direct DB mapping.
- **Models** in `Models/` represent DB entities. Inherit from `Base/BaseEntity.cs` for common fields.
- **Dependency Injection** is used for services and DbContext (see `Program.cs`).
- **Authentication:** JWT Bearer authentication is configured (see `AuthController.cs`).
- **Configuration:** App settings in `appsettings.json` and `appsettings.Development.json`.

## Integration Points
- **Entity Framework Core** for ORM and migrations.
- **JWT Authentication** for user login and protected endpoints.
- **External dependencies** managed via NuGet in `.csproj`.

## Examples
- To add a new endpoint: create a Controller in `Controllers/`, define DTOs in `Dtos/`, update Service in `Data/Services/`, and Model in `Models/` if needed.
- To add a migration: `dotnet ef migrations add <MigrationName>` then `dotnet ef database update`.

## References
- `Program.cs`: API startup, DI, middleware, authentication setup.
- `AppDbContext.cs`: EF Core DB context and entity configuration.
- `TransactionsController.cs`, `AuthController.cs`: Example controllers.
- `TransactionsService.cs`: Example service.

---

For unclear or missing conventions, ask the user for clarification before proceeding with major changes.
