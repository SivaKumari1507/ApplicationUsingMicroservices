using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Mango.Web.Models;
using Mango.Web.Models.Dto;
using Mango.Web.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Mango.Web.Controllers
{
    // [Route("[controller]")]
    public class CouponController : Controller
    {
        private readonly ICouponService _couponService;

        public CouponController(ICouponService couponService)
        {
            _couponService = couponService;
        }
        // [HttpGet]
        public async Task<IActionResult> CouponIndex()
        {
            List<CouponDto?> list = new();
            ResponseDto? response = await _couponService.GetAllCouponsAsync();
            if (response != null && response.IsSuccess)
            {
                // TempData["success"] = "Coupons Retrieved Successfully";
                list = JsonConvert.DeserializeObject<List<CouponDto>>(Convert.ToString(response.Result));
            }
            else
            {
                TempData["error"] = response?.Message;
            }
            return View(list);
        }
        // [HttpGet]
        // [Route("CreateCoupon")]
        public async Task<IActionResult> CreateCoupon()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateCoupon(CouponDto model)
        {
            if (ModelState.IsValid)
            {
                ResponseDto? response = await _couponService.CreateCouponAsync(model);
                if (response != null && response.IsSuccess)
                {
                    TempData["success"] = "Coupon Created Successfully";
                    return RedirectToAction(nameof(CouponIndex));
                }
                else
                {
                    TempData["error"] = response?.Message;
                }
            }
            return View(model);
        }

        public async Task<IActionResult> DeleteCoupon(int couponId)
        {
            ResponseDto? response = await _couponService.GetCouponByIdAsync(couponId);
            if (response != null && response.IsSuccess)
            {
                CouponDto? model = JsonConvert.DeserializeObject<CouponDto>(Convert.ToString(response.Result));
                return View(model);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> DeleteCoupon(CouponDto couponDto)
        {
            ResponseDto? response = await _couponService.DeleteCouponAsync(couponDto.CouponId);
            if (response != null && response.IsSuccess)
            {
                TempData["success"] = "Coupon Deleted Successfully";
                return RedirectToAction(nameof(CouponIndex));
            }
            else
            {
                TempData["error"] = response?.Message;
            }
            return View(couponDto);
        }




        /* [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        } */
    }
}