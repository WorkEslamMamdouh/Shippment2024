using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.API.Models;
using Inv.API.Models.CustomModel;
using Inv.API.Tools;
using Inv.BLL.Services.SalesMan;
using Inv.DAL.Domain;
using System.Net;
using System.Web.Http;
using System.Web.ModelBinding;
using System.Data.Common; 
using System.Security.Principal;
using System.ServiceModel;

namespace Inv.API.Controllers
{
    public class SalesManController : BaseController
    {


        private readonly ISalesManService SalesManService;
        private readonly G_USERSController UserControl;

        public SalesManController(ISalesManService _ISalesManService, G_USERSController _Control)
        {
            this.SalesManService = _ISalesManService;
            this.UserControl = _Control;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult InsertSalesMan(int CompCode, int BranchCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password, int SalesManID, int ZoneID , int UserType, string Gender)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Random random = new Random();
                    string deleteQuery = @"delete G_USERS where USER_CODE='" + UserName + @"'
                                          delete G_USER_COMPANY where USER_CODE = '" + UserName + @"'
                                          delete G_USER_BRANCH where USER_CODE = '" + UserName + @"'
                                          delete G_RoleUsers  where USER_CODE = '" + UserName + "'";
                    db.Database.ExecuteSqlCommand(deleteQuery);

                    // Generate a random integer between 1 and 100
                    int randomNumber = random.Next(1, 10000);
                    string Qury = @"declare @LASTID int 
                        INSERT INTO [dbo].[I_Sls_D_Salesman]
                    ([CompCode],[SalesmanCode],[NAMEA],[NAMEE],[IDNo],[MOBILE],[EMAIL],[Isactive],[CREATED_AT],[WebUserName],[WebPassword]
                    ,[ADDRESS],ZoneID,CC_Code)VALUES(N'" + CompCode + "',N'" + randomNumber + Convert.ToInt32(IDNO.Substring(IDNO.Length / 2)) + "',N'" + Name + "',N'" + Name + "',N'" + IDNO + "',N'" + Mobile + "',N'" + Email + "',1,N'" + DateTime.Now + "',N'" + UserName + "',N'" + Password + "',N'" + address + "'," + ZoneID + ",'"+Gender+"')  SET @LASTID = @@IDENTITY select @LASTID";

                    int SalnID = db.Database.SqlQuery<int>(Qury).FirstOrDefault();

                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(CompCode), BranchCode, SalnID, "DefSalesMan", "Add", db);
                    if (res.ResponseState == true)
                    {
                        dbTransaction.Commit();
                        //LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", SalesManID, "", LogUser.UserLog.Insert, "SignUp", true, null, null, null);
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
        public IHttpActionResult UpdateSalesMan(int CompCode, int BranchCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password, int SalesManID,int ZoneID, int UserType, string Gender)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Random random = new Random();

                    // Generate a random integer between 1 and 100
                    int randomNumber = random.Next(1, 10000);
                    string Qury = @"UPDATE[dbo].[I_Sls_D_Salesman] SET
                    [SalesmanCode] = N'" + randomNumber + Convert.ToInt32(IDNO.Substring(IDNO.Length / 2)) + "', [NAMEA]= N'" + Name + "',[NAMEE] = N'" + Name + "', [IDNo] = N'" + IDNO + "',[MOBILE] = N'" + Mobile + "',[EMAIL] = N'" + Email + "',[Isactive] = 1,[CREATED_AT] = N'" + DateTime.Now + "',[WebUserName] = N'" + UserName + "',CC_Code ='" + Gender + "',[WebPassword] = N'" + Password + "',[ADDRESS] =N'" + address + "',ZoneID = " + ZoneID + " where SalesManID = " + SalesManID + " ";
                    db.Database.ExecuteSqlCommand(Qury);
                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(CompCode), BranchCode, SalesManID, "DefSalesMan", "Update", db);
                    if (res.ResponseState == true)
                    {
                        dbTransaction.Commit();
                        //LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", SalesManID, "", LogUser.UserLog.Insert, "Update", true, null, null, null);
                        return Ok(new BaseResponse(true));
                    }
                    else
                    {
                        dbTransaction.Rollback();
                        //LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", SalesManID, "", LogUser.UserLog.Insert, "Update", false, res.ResponseMessage.ToString(), null, null);

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
        public IHttpActionResult UpdateZones([FromBody] List<Zones> obj)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    List<Zones> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                    List<Zones> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                    List<Zones> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                    foreach (var item in InsertedItems)
                    {
                        SalesManService.InsertZone(item);

                    }
                    foreach (var item in UpdatedItems)
                    { 
                        SalesManService.UpdateZone(item);

                    }
                    foreach (var item in DeletedItems)
                    {
                        SalesManService.DeleteZone(item.ZoneID);

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
        public IHttpActionResult InsertUser(int CompCode, int BranchCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password, int SalesManID ,int ZoneID, int UserType, string Gender)
        { 
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Random random = new Random();
                    string deleteQuery= @"delete G_USERS where USER_CODE='"+ UserName + @"'
                                          delete G_USER_COMPANY where USER_CODE = '"+ UserName + @"'
                                          delete G_USER_BRANCH where USER_CODE = '"+ UserName + @"'
                                          delete G_RoleUsers  where USER_CODE = '"+ UserName + "'";
                    db.Database.ExecuteSqlCommand(deleteQuery);
                   
                    string Qury = @"INSERT INTO [dbo].[G_USERS]
                    ([CompCode],[USER_NAME],[Fax],[MOBILE],[EMAIL],[USER_ACTIVE],[CreatedAt],[USER_CODE],[USER_PASSWORD]
                    ,[ADDRESS],CashBoxID,USER_TYPE,REGION_CODE)VALUES(N'" + CompCode + "',N'" + Name + "',N'" + IDNO + "',N'" + Mobile + "',N'" + Email + "',1,N'" + DateTime.Now + "',N'" + UserName + "',N'" + Password + "',N'" + address + "'," + ZoneID + "," + UserType + ",'" + Gender + "')";

                    db.Database.ExecuteSqlCommand(Qury);
                    var User = "UserAdministrator";
                    if (UserType == 5)
                    {
                        User = "UserAccount"; 
                    }
                    if (UserType == 3)
                    {
                        User = "StockKeeper";
                    }
                    if (UserType == 4)
                    {
                        User = "StockMan";
                    }
                    db.GProc_CreateUser(UserName, User);
                    db.GProc_GenerateUserPrivilage(CompCode, BranchCode, UserName); 

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
        public IHttpActionResult UpdateStores([FromBody] List<G_STORE> obj)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    List<G_STORE> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                    List<G_STORE> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                    List<G_STORE> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                    foreach (var item in InsertedItems)
                    {
                        SalesManService.InsertStore(item);

                    }
                    foreach (var item in UpdatedItems)
                    {
                        SalesManService.UpdateStore(item);

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
    }
}