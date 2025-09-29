using Mango.Services.ProductAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace Mango.Services.ProductAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    ProductId = 1,
                    Name = "UrbanWalk Sneakers",
                    Price = 2499,
                    Description = "Lightweight and breathable sneakers perfect for daily wear.",
                    CategoryName = "Casual",
                    ImageUrl = "https://tse4.mm.bing.net/th/id/OIP.ttj3YyOLOlCTVIRcDRZaAgHaGR?w=193&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
                },
                new Product
               {
                   ProductId = 2,
                   Name = "TrailMaster Hiking Boots",
                   Price = 4999,
                   Description = "Durable boots with excellent grip for trekking and hiking.",
                   CategoryName = "Outdoor",
                   ImageUrl = "https://tse3.mm.bing.net/th/id/OIP.rexnCoYjJHefbqRr0YbrTQHaHa?w=211&h=211&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
               },

                new Product
                {
                    ProductId = 3,
                    Name = "Elegance Stiletto Heels",
                    Price = 3299,
                    Description = "Stylish heels for formal occasions and parties.",
                    CategoryName = "Formal",
                    ImageUrl = "https://tse2.mm.bing.net/th/id/OIP.LRyCYvWTL8VbrHpn_xeEgwHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                },
                new Product
                {
                    ProductId = 4,
                    Name = "BeachEase Flip-Flops",
                    Price = 599,
                    Description = "Comfortable flip-flops ideal for beach and casual use.",
                    CategoryName = "Casual",
                    ImageUrl = "https://images.price.tools/images/oofoam-flip-flops-olive-7-l-1PWBfmps.jpg"
                }

            );

        }
    }
}