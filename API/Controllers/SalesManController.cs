﻿using System;
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
        public IHttpActionResult InsertSalesMan(int CompCode, int BranchCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password,string CompName)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Random random = new Random();

                    // Generate a random integer between 1 and 100
                    int randomNumber = random.Next(1, 10000);
                    string Qury = @"declare @LASTID int 
                        INSERT INTO [dbo].[I_Sls_D_Salesman]
                    ([CompCode],[SalesmanCode],[NAMEA],[NAMEE],[IDNo],[MOBILE],[EMAIL],[Isactive],[CREATED_AT],[WebUserName],[WebPassword]
                    ,[ADDRESS],REMARKS)VALUES(N'" + CompCode + "',N'" + randomNumber + Convert.ToInt32(IDNO.Substring(IDNO.Length / 2)) + "',N'" + Name + "',N'" + Name + "',N'" + IDNO + "',N'" + Mobile + "',N'" + Email + "',1,N'" + DateTime.Now + "',N'" + UserName + "',N'" + Password + "',N'" + address + "',N'" + CompName+ "')  SET @LASTID = @@IDENTITY select @LASTID";

                    int SalesManID = db.Database.SqlQuery<int>(Qury).FirstOrDefault();

                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(CompCode), BranchCode, SalesManID, "DefSalesMan", "Add", db);
                    if (res.ResponseState == true)
                    {
                        dbTransaction.Commit();
                        LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", SalesManID, "", LogUser.UserLog.Insert, "SignUp", true, null, null, null);
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
        public IHttpActionResult UpdateSalesMan(int CompCode, int BranchCode, string Name, string address, string Mobile, string IDNO, string Email, string UserName, string Password, int SalesManID,string CompName)
        {

            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    Random random = new Random();

                    // Generate a random integer between 1 and 100
                    int randomNumber = random.Next(1, 10000);
                    string Qury = @"UPDATE[dbo].[I_Sls_D_Salesman] SET
                    [SalesmanCode] = N'" + randomNumber + Convert.ToInt32(IDNO.Substring(IDNO.Length / 2)) + "', [NAMEA]= N'" + Name + "',[NAMEE] = N'" + Name + "', [IDNo] = N'" + IDNO + "',[MOBILE] = N'" + Mobile + "',[EMAIL] = N'" + Email + "',[Isactive] = 1,[CREATED_AT] = N'" + DateTime.Now + "',[WebUserName] = N'" + UserName + "',[WebPassword] = N'" + Password + "',[ADDRESS] =N'" + address + "',REMARKS = N'" + CompName+ "' where SalesManID = " + SalesManID + " ";
                    db.Database.ExecuteSqlCommand(Qury);
                    ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(CompCode), BranchCode, SalesManID, "DefSalesMan", "Update", db);
                    if (res.ResponseState == true)
                    {
                        dbTransaction.Commit();
                        LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", SalesManID, "", LogUser.UserLog.Insert, "Update", true, null, null, null);
                        return Ok(new BaseResponse(true));
                    }
                    else
                    {
                        dbTransaction.Rollback();
                        LogUser.InsertPrint(db, CompCode.ToString(), BranchCode.ToString(), DateTime.Now.Year.ToString(), "", SalesManID, "", LogUser.UserLog.Insert, "Update", false, res.ResponseMessage.ToString(), null, null);

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