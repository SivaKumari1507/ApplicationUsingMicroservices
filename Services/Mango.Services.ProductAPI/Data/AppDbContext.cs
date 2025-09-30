using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                ImageUrl = "https://example.com/images/urbanwalk.jpg"
            },

               new Product
               {
                   ProductId = 2,
                   Name = "TrailMaster Hiking Boots",
                   Price = 4999,
                   Description = "Durable boots with excellent grip for trekking and hiking.",
                   CategoryName = "Outdoor",
                   ImageUrl = "https://example.com/images/trailmaster.jpg"
               },
            new Product
            {
                ProductId = 3,
                Name = "Elegance Stiletto Heels",
                Price = 3299,
                Description = "Stylish heels for formal occasions and parties.",
                CategoryName = "Formal",
                ImageUrl = "https://example.com/images/elegance.jpg"
            },
            new Product
            {
                ProductId = 4,
                Name = "BeachEase Flip-Flops",
                Price = 599,
                Description = "Comfortable flip-flops ideal for beach and casual use.",
                CategoryName = "Casual",
                ImageUrl = "https://example.com/images/beachease.jpg"
            }
            );
        }
    }
}