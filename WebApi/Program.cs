
using Application;
using Infrastructure;
using Infrastructure.Config;
using Infrastructure.DB;
using Serilog;

//create the logger
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("User Webapi starting up");

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog((_, config) => config.ReadFrom.Configuration(builder.Configuration));

// Add services to the container.
// Add services to the container.
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDB"));

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

WebApplication app = builder.Build();

// Seed Demo Database
using (IServiceScope scope = app.Services.CreateScope())
{
    IServiceProvider service = scope.ServiceProvider;

    try
    {
        DBGenerator context = service.GetRequiredService<DBGenerator>();
        await context.InitializeAsync();
    }
    catch (Exception)
    {
        throw;
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerUI();
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
