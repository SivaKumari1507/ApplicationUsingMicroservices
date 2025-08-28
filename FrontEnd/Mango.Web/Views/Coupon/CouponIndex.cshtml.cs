using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Mango.Web.Views.Coupon
{
    public class CouponIndex : PageModel
    {
        private readonly ILogger<CouponIndex> _logger;

        public CouponIndex(ILogger<CouponIndex> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}