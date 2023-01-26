using Application.Interface.SPI;

using Ardalis.GuardClauses;

using Domain;

using Microsoft.Extensions.Caching.Memory;

namespace Infrastructure.Services
{
    public class MemoryCacheUsersService : ICacheUsersService
    {
        private readonly IMemoryCache _cache;

        public MemoryCacheUsersService(IMemoryCache cache)
        {
            Guard.Against.Null(cache, nameof(cache));

            _cache = cache;
        }

        public async Task<IEnumerable<UserDTO>> Get(string key)
        {
            await Task.CompletedTask;

            return _cache.Get<IEnumerable<UserDTO>>(key);
        }

        public async Task Remove(string key)
        {
            await Task.CompletedTask;
            _cache.Remove(key);
        }

        public async Task<bool> Set(string key, IEnumerable<UserDTO> value)
        {
            await Task.CompletedTask;

            var item = _cache.Get(key);

            if (item == null)
            {
                var cacheOption = new MemoryCacheEntryOptions()
                            .SetAbsoluteExpiration(TimeSpan.FromSeconds(10));

                _cache.Set(key, value, cacheOption);

            }

            return true;
        }
    }
}