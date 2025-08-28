using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Mango.Web.Views.Coupon
{
    public class CreateCoupon : PageModel
    {
        private readonly ILogger<CreateCoupon> _logger;

        public CreateCoupon(ILogger<CreateCoupon> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}