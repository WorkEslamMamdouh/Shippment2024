using System;
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
using System.Security.Principal;

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
        public IHttpActionResult SignUp(int CompCode, int BranchCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password,string CompName, int Type_Payment , string FrontID_Img , string BackID_Img)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Random random = new Random();

                    // Generate a random integer between 1 and 100
                    int randomNumber = random.Next(1000, 100000);
                    string Qury = @"declare @LASTID int 
                        INSERT INTO [dbo].[A_Pay_D_Vendor]
                    ([CompCode],[VendorCode],[NAMEA],[NAMEL],[IDNo],[MOBILE],[EMAIL],[Isactive],[CREATED_AT],[WebUserName],[WebPassword]
                    ,[Address_Street],REMARKS , IsCreditVendor)VALUES(N'" + CompCode + "',N'" + randomNumber + "',N'" + Name + "',N'" + Name + "',N'" + IDNO + "',N'" + Mobile + "',N'" + Email + "',1,N'" + DateTime.Now + "',N'" + UserName + "',N'" + Password + "',N'" + address + "',N'" + CompName + "'," + Type_Payment + ")  SET @LASTID = @@IDENTITY select @LASTID";

                    int Vendorid = db.Database.SqlQuery<int>(Qury).FirstOrDefault();

                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(CompCode), BranchCode, Vendorid, "SignUp", "Add", db);
                    if (res.ResponseState == true)
                    {

                        db.Database.ExecuteSqlCommand("update [dbo].[G_USERS] set FrontID_Img = N'"+ FrontID_Img + "' , BackID_Img =N'"+ BackID_Img + "' where USER_CODE = N'"+ UserName + "';");
                        db.Database.ExecuteSqlCommand("update I_Control set InvoiceTransCode = N'"+ randomNumber + "' ");
                        dbTransaction.Commit();
                        //LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", Vendorid, "", LogUser.UserLog.Insert, "SignUp", true, null, null, null);
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

        [HttpGet, AllowAnonymous]
        public IHttpActionResult UpdateSeller(int CompCode, int BranchCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password, int VendorId, string CompName , string  Profile_Img,int Type_Payment)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Random random = new Random();   

                    // Generate a random integer between 1 and 100
                    int randomNumber = random.Next(1, 10000);
                    string Qury = @"UPDATE[dbo].[A_Pay_D_Vendor] SET
                    [VendorCode] = N'" + randomNumber + "',REMARKS =N'"+CompName+"', [NAMEA]= N'" + Name + "',[NAMEL] = N'" + Name + "', [IDNo] = N'" + IDNO + "',[MOBILE] = N'" + Mobile + "',[EMAIL] = N'" + Email + "',[Isactive] = 1,[CREATED_AT] = N'" + DateTime.Now + "',[WebUserName] = N'" + UserName + "',[WebPassword] = N'" + Password + "',[Address_Street] =N'" + address + "' , IsCreditVendor = "+ Type_Payment + "  where VendorID = " + VendorId + " ";
                    db.Database.ExecuteSqlCommand(Qury);
                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(CompCode), BranchCode, VendorId, "SignUp", "Update", db);
                    if (res.ResponseState == true)
                    { 
                        db.Database.ExecuteSqlCommand("update [dbo].[G_USERS] set Profile_Img = N'" + Profile_Img + "'");

                        dbTransaction.Commit();
                        LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", VendorId, "", LogUser.UserLog.Insert, "Update", true, null, null, null);
                        return Ok(new BaseResponse(true));
                    }
                    else
                    {
                        dbTransaction.Rollback();
                        LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", VendorId, "", LogUser.UserLog.Insert, "Update", false, res.ResponseMessage.ToString(), null, null);

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
        [HttpGet, AllowAnonymous]
        public IHttpActionResult UpdateProfile(int CompCode, int BranchCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password, int VendorId,string CompName, string Profile_Img, int Type_Payment)
        { 
            string Qury = @"UPDATE[dbo].[G_USERS] SET GRP_CODE = "+ Type_Payment + @",
            [USER_PASSWORD] = N'" + Password + "',[USER_NAME] = N'" + Name + "',[fax] = N'" + IDNO + "',[Address] = N'" + address + "',[Mobile] = N'" + Mobile + "',[Email] = N'" + Email + "' where USER_CODE = N'" + UserName + "' ";
            db.Database.ExecuteSqlCommand(Qury);

            return Ok(new BaseResponse(true));
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Blockseller(string CompCode, string BranchCode, string SellerCode, string USER_CODE,int Active)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                { 

                    string Qury = @"Update G_USERS set USER_ACTIVE = " + Active + " where USER_CODE = '"+SellerCode+"'";
                    db.Database.ExecuteSqlCommand(Qury);
                    LogUser.Insert(db, CompCode, BranchCode, DateTime.Now.Year.ToString(), "", null, "", LogUser.UserLog.Insert,LogUser.PageName.VendorControl, true, null, null,"Block Vendor "+SellerCode+" By User "+ USER_CODE+ "");
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

    }
}