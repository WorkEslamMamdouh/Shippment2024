using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.VoucherType;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;


namespace Inv.API.Controllers
{
    public class VoucherTypeController : BaseController

    {
        private readonly IVoucherTypeService VoucherTypeService;
        private readonly G_USERSController UserControl ;
        public VoucherTypeController(IVoucherTypeService _VoucherTypeService, G_USERSController _Control )
        {
            this.VoucherTypeService = _VoucherTypeService;
            this.UserControl = _Control;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode,int vouchertype, string UserCode, string Token)
        {
            if (ModelState.IsValid  )
            {
                var VoucherType = VoucherTypeService.GetAll(s => s.COMP_CODE == CompCode && s.VoucherType == vouchertype).ToList();

                return Ok(new BaseResponse(VoucherType));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var VoucherType = VoucherTypeService.GetById(id);

                return Ok(new BaseResponse(VoucherType));
            }
            return BadRequest(ModelState);
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]A_Voucher_Types Model)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Model.Token, Model.UserCode))
            {
                    try
                    {
                        var VoucherType = VoucherTypeService.Insert(Model);
                        return Ok(new BaseResponse(VoucherType));
                    }
                    catch (Exception ex)
                    {
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int ID, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                try
                {
                    VoucherTypeService.Delete(ID);
                    return Ok(new BaseResponse());
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(0, "Error"));
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateVouchers([FromBody] List<A_Voucher_Types> Model)
        {
            using (System.Data.Entity.DbContextTransaction dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    var inserted = Model.Where(x => x.StatusFlag == 'i').ToList();
                    var updated = Model.Where(x => x.StatusFlag == 'u').ToList();
                    var deleted = Model.Where(x => x.StatusFlag == 'd').ToList();
                    foreach (var voucher in inserted)
                    {
                        VoucherTypeService.Insert(voucher);
                    }
                    foreach (var voucher in updated)
                    {
                        VoucherTypeService.Update(voucher);
                    }
                    foreach (var voucher in deleted)
                    {
                         var VToRemove = db.A_Voucher_Types.FirstOrDefault(x =>
                         x.COMP_CODE == voucher.COMP_CODE &&
                         x.VoucherType == voucher.VoucherType &&
                         x.TYPE_CODE == voucher.TYPE_CODE);
                         db.A_Voucher_Types.Remove(VToRemove);
                         db.SaveChanges();
                        // db.Database.ExecuteSqlCommand("delete A_Voucher_Types where COMP_CODE =" + voucher.COMP_CODE + " and VoucherType =" + voucher.VoucherType + " and TYPE_CODE = " + voucher.TYPE_CODE + " ");
                    }
                    dbTrans.Commit();
                    return Ok(new BaseResponse(VoucherTypeService));

                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    return Ok(new BaseResponse(false));
                }
            }
        }

        //[HttpPost, AllowAnonymous]
        //public IHttpActionResult UpdateLst(List<A_Voucher_Types> Vouchers)
        //{
        //    try
        //    {
        //        VoucherTypeService.UpdateList(A_Voucher_Types);
        //        return Ok(new BaseResponse());
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //    }
        //}

    }
}
