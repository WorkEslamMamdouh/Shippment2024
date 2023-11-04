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
using System.Reflection.Emit;
using Unity;

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
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(true));
                    
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

                     dbTransaction.Commit();
                         return Ok(new BaseResponse(true));
                   
                }
                catch (Exception ex)
                {

                    dbTransaction.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }



        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult UpdateInvStatus(int CompCode,int BranchCode,int InvoiceID, int SlsManID, int Status,string UserCode, string StatusDesc)
        {
            string Cond = "";
            if (SlsManID != 0 )
            {
                Cond = ", SalesmanId = " + SlsManID + "";
            }
            string Qury = @"UPDATE[dbo].[Sls_Invoice] SET
            Status ="+Status+" "+Cond+" where InvoiceID = " + InvoiceID + "";
            db.Database.ExecuteSqlCommand(Qury);


            LogUser.Insert(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), UserCode, InvoiceID, "", LogUser.UserLog.Insert, LogUser.PageName.Invoice, true, null, null, StatusDesc);
            return Ok(new BaseResponse(true));
        }

    }
}