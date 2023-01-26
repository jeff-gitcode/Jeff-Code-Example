
using Application;
using Infrastructure;
using Infrastructure.DB;
using Serilog;

//create the logger
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("User Webapi starting up");

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog((_, config) => config.ReadFrom.Configuration(builder.Configuration));

// Add services to the container.
// add different layer
builder.Services.ConfigureInfrastructureServices(builder.Configuration);

builder.Services.ConfigureApplicationServices();

builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//Enable CORS//Cross site resource sharing
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        b => b.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Seed Demo Database
using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;

    try
    {
        var context = service.GetRequiredService<DBGenerator>();
        await context.InitializeAsync();
    }
    catch (Exception ex)
    {
        throw ex;
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Log all requests
app.UseSerilogRequestLogging();

// error handling
app.UseExceptionHandler("/error");

// https
app.UseHttpsRedirection();

// Enable CORS
app.UseCors("CorsPolicy");

// app.UseAuthorization();

app.MapControllers();

// mapping health check endpoint
app.MapHealthChecks("/health");

app.Run();
