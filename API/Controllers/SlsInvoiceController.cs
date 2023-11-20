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
                        var NewItem = item;
                        var cnt = item.SoldQty;
                        for (int i = 0; i < cnt; i++)
                        {
                            NewItem.SoldQty = 1;
                            SlsInvoiceService.InsertInvItems(NewItem);
                        }
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
                    var sls = SlsInvoiceService.UpdateInvoice(obj.Sls_Invoice);
                    List<Sls_InvoiceItem> InsertedItems = obj.Sls_InvoiceItem.Where(x => x.StatusFlag == 'i').ToList();
                    List<Sls_InvoiceItem> UpdatedItems = obj.Sls_InvoiceItem.Where(x => x.StatusFlag == 'u').ToList();
                    List<Sls_InvoiceItem> DeletedItems = obj.Sls_InvoiceItem.Where(x => x.StatusFlag == 'd').ToList();


                    foreach (var item in DeletedItems)
                    {
                        db.Database.ExecuteSqlCommand("delete from Sls_InvoiceItem where InvoiceID=" + item.InvoiceID + " and  ItemDescA=N'" + item.ItemDescA + "' and Unitprice=" + item.Unitprice + " ");

                    }

                    foreach (var item in InsertedItems)
                    {
                        item.InvoiceID = sls.InvoiceID;
                        var NewItem = item;
                        var cnt = item.SoldQty;
                        for (int i = 0; i < cnt; i++)
                        {
                            NewItem.SoldQty = 1;
                            SlsInvoiceService.InsertInvItems(NewItem);
                        }
                    }


                    foreach (var item in UpdatedItems)
                    {
                        item.InvoiceID = sls.InvoiceID;
                        SlsInvoiceService.UpdateInvItems(item);

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
        public IHttpActionResult UpdateInvStatus(int CompCode, int BranchCode, int InvoiceID, int SlsManID, int Status, string UserCode, string StatusDesc)
        {
            string Cond = "";
            if (SlsManID != 0)
            {
                Cond = ", SalesmanId = " + SlsManID + "";
            }
            string Qury = @"UPDATE[dbo].[Sls_Invoice] SET
            Status =" + Status + " " + Cond + " where InvoiceID = " + InvoiceID + "";
            db.Database.ExecuteSqlCommand(Qury);

            if (SlsManID != 0)
            {
                string Query = @"UPDATE[dbo].[Sls_InvoiceItem] SET
            SalesManID =" + SlsManID + " where InvoiceID = " + InvoiceID + "";
                db.Database.ExecuteSqlCommand(Query);

            }

            LogUser.Insert(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), UserCode, InvoiceID, "", LogUser.UserLog.Update, LogUser.PageName.Invoice, true, null, null, StatusDesc);
            return Ok(new BaseResponse(true));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult CashCollectFrom_Delivery(int CompCode, int BranchCode, string ListInvoiceID,string ListInvoiceIDRet, int SlsManID, string UserCode, string StatusDesc)
        {


            string Cond = "";

            Cond = ", SalesmanId = " + SlsManID + "";

            if (ListInvoiceID.Trim() != "")
            {
    

                string Qury = @"UPDATE[dbo].[Sls_Invoice] SET
                 Status =6 " + Cond + " where InvoiceID in ( " + ListInvoiceID + ")";
                db.Database.ExecuteSqlCommand(Qury);
            }

            if (ListInvoiceIDRet.Trim() != "")
            {

                string Qury = @"UPDATE[dbo].[Sls_Invoice] SET
                 Status =3 " + Cond + " where InvoiceID in ( " + ListInvoiceIDRet + ")";
                db.Database.ExecuteSqlCommand(Qury);
            }


            LogUser.Insert(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), UserCode, 0, "", LogUser.UserLog.Update, LogUser.PageName.Invoice, true, null, null, StatusDesc);
            return Ok(new BaseResponse(true));
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult UpdateInvTrType(int CompCode, int BranchCode, int InvoiceID , int TrType, string UserCode, string StatusDesc)
        {
            
            string Qury = @"UPDATE[dbo].[Sls_Invoice] SET
            TrType =" + TrType + "  where InvoiceID = " + InvoiceID + "";
            db.Database.ExecuteSqlCommand(Qury);
              
            LogUser.Insert(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), UserCode, InvoiceID, "", LogUser.UserLog.Update, LogUser.PageName.Invoice, true, null, null, StatusDesc);
            return Ok(new BaseResponse(true));
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult Coding_Item([FromBody] List<CustomCoding> obj)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    db.Database.ExecuteSqlCommand("Update Sls_Invoice set StoreID = " + obj[0].StoreID + ", Status = 3  where InvoiceID = " + obj[0].InvoiceID + "");
                    for (int i = 0; i < obj.Count; i++)
                    {
                        db.Database.ExecuteSqlCommand("update Sls_InvoiceItem set itemcode=N'" + obj[i].ItemCode + "' , StoreID = " + obj[i].StoreID + " where InvoiceItemID = " + obj[i].InvoiceItemID +"");
                    }
                    LogUser.Insert(db, obj[0].CompCode.ToString(), obj[0].BranchCode.ToString(), DateTime.Now.Year.ToString(), obj[0].UserCode, obj[0].InvoiceID, "", LogUser.UserLog.Insert, LogUser.PageName.Coding_item, true, null, null, "Coding Item");
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
        public IHttpActionResult ReturnInvoice([FromBody] CustomCoding obj)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                { 

                    string Qury = @"declare @LASTID int
                    insert into Sls_Invoice
                    (TrNo, RefNO, RefTrID, TrDate, TrDateH, TrType, CustomerName, CustomerMobile1, CustomerMobile2, Address,
                    Location, SalesmanId, TotalAmount, VatAmount, VatType, DiscountAmount, DiscountPrc, NetAfterVat, 
                    CommitionAmount, CashAmount, CardAmount, RemainAmount, Remark, Status, CreatedAt, CreatedBy, UpdatedAt,
                    UpdatedBy, CompCode, BranchCode, DocNo, TrTime, QRCode, DeliveryDate, DeliveryEndDate, PromoCode, 
                    ChargeAmount, ItemCount, LineCount, VendorID)
                    select  TrNo, RefNO, " + obj.InvoiceID + @", '" + DateTime.Now.ToString() + @"', TrDateH, 1, CustomerName, CustomerMobile1, CustomerMobile2, Address,
                    Location, SalesmanId, TotalAmount, VatAmount, VatType, DiscountAmount, DiscountPrc, NetAfterVat, 
                    CommitionAmount, CashAmount, CardAmount, RemainAmount, Remark, Status,  '" + DateTime.Now.ToString() + @"', '" + obj.UserCode + @"', UpdatedAt,
                    UpdatedBy, CompCode, BranchCode, DocNo, TrTime, QRCode, DeliveryDate, DeliveryEndDate, PromoCode, 
                    ChargeAmount, ItemCount, LineCount, VendorID
                    from Sls_Invoice where InvoiceID = " + obj.InvoiceID + " SET @LASTID = @@IDENTITY select @LASTID";

                    int RetIvoiceID = db.Database.SqlQuery<int>(Qury).FirstOrDefault();

                    string Query = @"Update Sls_InvoiceItem set InvoiceID = "+ RetIvoiceID + @" where InvoiceItemID in ("+obj.ItemCode+") ";

                    db.Database.ExecuteSqlCommand(Query);

                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(obj.CompCode), obj.BranchCode, RetIvoiceID, "InvRet", "Add", db);
                    if (res.ResponseState == true)
                    {
                        dbTransaction.Commit();
                        LogUser.Insert(db, obj.CompCode.ToString(), obj.BranchCode.ToString(), DateTime.Now.Year.ToString(), "", RetIvoiceID, "", LogUser.UserLog.Insert, LogUser.PageName.InvoiceReturn, true, null, null, "اضافة مرتجع");
                        return Ok(new BaseResponse(true));
                    }
                    else
                    { 
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed,"Error"));
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