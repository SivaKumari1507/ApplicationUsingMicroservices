using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Mango.Web.Views.Coupon
{
    public class DeleteCoupon : PageModel
    {
        private readonly ILogger<DeleteCoupon> _logger;

        public DeleteCoupon(ILogger<DeleteCoupon> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}