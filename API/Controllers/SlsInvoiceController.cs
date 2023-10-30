using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.SlsInvoice;
using Inv.DAL.Domain;
using System.Net;
using System.Web.Http;
using System.Web.ModelBinding;
using System.Data.Common; 
using System.Security.Principal;

namespace Inv.API.Controllers
{
    public class SlsInvoiceController : BaseController
    {


        private readonly ISlsInvoiceService SlsInvoiceService;
        private readonly G_USERSController UserControl;

        public SlsInvoiceController(ISlsInvoiceService _ISlsInvoiceService, G_USERSController _Control)
        {
            this.SlsInvoiceService = _ISlsInvoiceService;
            this.UserControl = _Control;
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody] SlsInvoiceMasterDetail obj)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    var sls = SlsInvoiceService.InsertInvoice(obj.Sls_Invoice);
                    List<Sls_InvoiceItem> InsertedItems = obj.Sls_InvoiceItem.Where(x => x.StatusFlag == 'i').ToList();
                    foreach (var item in InsertedItems)
                    {
                        item.InvoiceID = sls.InvoiceID;
                        SlsInvoiceService.InsertInvItems(item);

                    }
                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(sls.CompCode), Convert.ToInt32(sls.BranchCode), sls.InvoiceID, "SlsInv", "Add", db);
                    if (res.ResponseState == true)
                    {
                        dbTransaction.Commit();
                        LogUser.InsertPrint(db, sls.CompCode.ToString(), sls.BranchCode.ToString(), DateTime.Now.Year.ToString(), "", sls.InvoiceID, "", LogUser.UserLog.Insert, "SlsInv", true, null, null, null);
                        return Ok(new BaseResponse(true));
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
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] SlsInvoiceMasterDetail obj)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    var sls = SlsInvoiceService.InsertInvoice(obj.Sls_Invoice);
                    List<Sls_InvoiceItem> InsertedItems = obj.Sls_InvoiceItem.Where(x => x.StatusFlag == 'i').ToList();
                    List<Sls_InvoiceItem> UpdatedItems = obj.Sls_InvoiceItem.Where(x => x.StatusFlag == 'u').ToList();
                    List<Sls_InvoiceItem> DeletedItems = obj.Sls_InvoiceItem.Where(x => x.StatusFlag == 'd').ToList();

                    foreach (var item in InsertedItems)
                    {
                        item.InvoiceID = sls.InvoiceID;
                        SlsInvoiceService.InsertInvItems(item);

                    }
                    foreach (var item in UpdatedItems)
                    {
                        item.InvoiceID = sls.InvoiceID;
                        SlsInvoiceService.UpdateInvItems(item);

                    }
                    foreach (var item in DeletedItems)
                    {
                        item.InvoiceID = sls.InvoiceID;
                        SlsInvoiceService.DeleteInvItems(item.InvoiceItemID);

                    }

                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(sls.CompCode), Convert.ToInt32(sls.BranchCode), sls.InvoiceID, "SlsInv", "Update", db);
                    if (res.ResponseState == true)
                    {
                        dbTransaction.Commit();
                        LogUser.InsertPrint(db, sls.CompCode.ToString(), sls.BranchCode.ToString(), DateTime.Now.Year.ToString(), "", sls.InvoiceID, "", LogUser.UserLog.Insert, "SlsInv", true, null, null, null);
                        return Ok(new BaseResponse(true));
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


    }
}