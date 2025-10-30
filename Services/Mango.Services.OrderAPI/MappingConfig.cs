using AutoMapper;
using Mango.Services.OrderAPI.Models;
using Mango.Services.OrderAPI.Models.Dto;

namespace Mango.Services.OrderAPI
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                /* config.CreateMap<OrderHeaderDto, CartHeaderDto>().
                ForMember(dest => dest.CartTotal, u => u.MapFrom(src => src.OrderTotal)).ReverseMap();
 */

                config.CreateMap<CartHeaderDto, OrderHeaderDto>()
                   .ForMember(dest => dest.OrderTotal, opt => opt.MapFrom(src => src.CartTotal))
                   .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                   .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                   .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone))
                   .ForMember(dest => dest.Discount, opt => opt.MapFrom(src => src.Discount))
                   .ReverseMap();
                config.CreateMap<CartDetailsDto, OrderDetailsDto>().
                ForMember(dest => dest.ProductName, u => u.MapFrom(src => src.Product.Name)).
                ForMember(dest => dest.Price, u => u.MapFrom(src => src.Product.Price));

                config.CreateMap<OrderDetailsDto, CartDetailsDto>();

                config.CreateMap<OrderHeader, OrderHeaderDto>().ReverseMap();
                config.CreateMap<OrderDetails, OrderDetailsDto>().ReverseMap();




            });
            return mappingConfig;
        }
    }
}