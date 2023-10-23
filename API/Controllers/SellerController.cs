﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.Seller; 
using Inv.DAL.Domain; 
using System.Net;
using System.Web.Http;
using System.Web.ModelBinding;
using System.Data.Common;
using Inv.BLL.Services.SlsInvoiceItems;
using Inv.BLL.Services.AccDefVendor;

namespace Inv.API.Controllers
{
    public class SellerController : BaseController
    {

        
        private readonly ISellerService SellerService;
        private readonly G_USERSController UserControl;

        public SellerController(ISellerService _ISellerService, G_USERSController _Control)
        {
            this.SellerService = _ISellerService; 
            this.UserControl = _Control;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult SignUp(int CompCode,int BranchCode,string Name,string address , string Mobile ,string IDNO,string Email,string UserName,string Password,string UserCode,string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        A_Pay_D_Vendor Vendor = db.Database.SqlQuery<A_Pay_D_Vendor>(@"INSERT INTO [dbo].[A_Pay_D_Vendor]
                    ([CompCode],[VendorCode],[NAMEA],[NAMEL],[IDNo],[MOBILE],
                    [EMAIL],[Isactive],[CREATED_BY],[CREATED_AT],[WebUserName],[WebPassword]
                    ,[Address_Street])VALUES(" + CompCode + "," + IDNO + "," + Name + "," + Name + "," + IDNO + "," + Mobile + "," + Email + "," + UserCode + "," + DateTime.Now + "," + UserName + "," + Password + ")").FirstOrDefault();

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(CompCode),BranchCode,Vendor.VendorID, "Seller", "Add", db);
                        if (res.ResponseState == true)
                        {

                            Vendor.VendorID= int.Parse(res.ResponseData.ToString());
                              
                            dbTransaction.Commit();
                            //LogUser.InsertPrint(db, obj.Comp_Code.ToString(), obj.Branch_Code, obj.sec_FinYear, obj.UserCode, obj.I_Sls_TR_Invoice.InvoiceID, obj.I_Sls_TR_Invoice.TrNo.ToString(), LogUser.UserLog.Insert, obj.MODULE_CODE, true, null, null, null);
                            return Ok(new BaseResponse(Vendor));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            //LogUser.InsertPrint(db, obj.Comp_Code.ToString(), obj.Branch_Code, obj.sec_FinYear, obj.UserCode, obj.I_Sls_TR_Invoice.InvoiceID, obj.I_Sls_TR_Invoice.TrNo.ToString(), LogUser.UserLog.Insert, obj.MODULE_CODE, false, res.ResponseMessage.ToString(), null, null);

                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {

                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
               
                 


            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] A_Pay_D_Vendor obj)
        {
            if (ModelState.IsValid && UserControl.CheckUser(obj.Token, obj.UserCode))
            {
                try
                {
                    using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                    {

                        A_Pay_D_Vendor AccDefVen = SellerService.Update(obj);
                         
                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(AccDefVen.CompCode), 0, AccDefVen.VendorID, "Seller", "Update", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            LogUser.InsertPrint(db, obj.Comp_Code.ToString(), obj.Branch_Code, obj.sec_FinYear, obj.UserCode, obj.VendorID, obj.VendorCode, LogUser.UserLog.Update, obj.MODULE_CODE, true, null, null, null);
                            return Ok(new BaseResponse(obj));
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            LogUser.InsertPrint(db, obj.Comp_Code.ToString(), obj.Branch_Code, obj.sec_FinYear, obj.UserCode, obj.VendorID, obj.VendorCode, LogUser.UserLog.Update, obj.MODULE_CODE, false, res.ResponseMessage.ToString(), null, null);
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }


                }
                catch (Exception ex)
                {
                    LogUser.InsertPrint(db, obj.Comp_Code.ToString(), obj.Branch_Code, obj.sec_FinYear, obj.UserCode, obj.VendorID, obj.VendorCode, LogUser.UserLog.Update, obj.MODULE_CODE, true, null, null, "VendorDocID");
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

    }
}