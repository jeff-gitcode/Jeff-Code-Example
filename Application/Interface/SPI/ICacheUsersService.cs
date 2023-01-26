using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interface.SPI
{
    public interface ICacheUsersService
    {
        Task<bool> Set(string key, IEnumerable<UserDTO> value);
        Task<IEnumerable<UserDTO>> Get(string key);
        Task Remove(string key);
    }
}
