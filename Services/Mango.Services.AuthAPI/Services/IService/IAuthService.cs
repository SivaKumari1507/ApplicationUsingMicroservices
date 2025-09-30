using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mango.Services.AuthAPI.Models.Dto;

namespace Mango.Services.AuthAPI.Services.IService
{
    public interface IAuthService
    {
        Task<string> Register(RegisterationRequestDto registerationRequestDto);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<bool> AssignRole(string email, string roleName);
    }
}