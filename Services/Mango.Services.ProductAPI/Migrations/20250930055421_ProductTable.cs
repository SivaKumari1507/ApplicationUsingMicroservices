using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Mango.Services.ProductAPI.Migrations
{
    /// <inheritdoc />
    public partial class ProductTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    CategoryName = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "CategoryName", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Casual", "Lightweight and breathable sneakers perfect for daily wear.", "https://example.com/images/urbanwalk.jpg", "UrbanWalk Sneakers", 2499.0 },
                    { 2, "Outdoor", "Durable boots with excellent grip for trekking and hiking.", "https://example.com/images/trailmaster.jpg", "TrailMaster Hiking Boots", 4999.0 },
                    { 3, "Formal", "Stylish heels for formal occasions and parties.", "https://example.com/images/elegance.jpg", "Elegance Stiletto Heels", 3299.0 },
                    { 4, "Casual", "Comfortable flip-flops ideal for beach and casual use.", "https://example.com/images/beachease.jpg", "BeachEase Flip-Flops", 599.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
