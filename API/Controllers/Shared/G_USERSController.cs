using Inv.API.Models;
using Inv.API.Tools;
using Inv.DAL.Domain;
using System;
using System.Linq;
using System.Net;
using System.Web.Http; 
using Inv.BLL.Services.GUSERS;
using Inv.BLL.Services.USER_BRANCH;
using Inv.API.Models.CustomModel;
using System.Text;
using System.Security.Cryptography;
using System.Collections.Generic;

namespace Inv.API.Controllers
{
    public class G_USERSController : BaseController

    {
        private readonly IG_USERSService G_USERSService;
        private readonly IG_USER_BRANCHService G_USER_BRANCHService;


        public G_USERSController(IG_USERSService _G_USERSController , IG_USER_BRANCHService _G_USER_BRANCHService )
        {

            this.G_USERSService = _G_USERSController;
            this.G_USER_BRANCHService = _G_USER_BRANCHService;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string CompCode, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                int compcod = Convert.ToInt32(CompCode);
                var documents = G_USERSService.GetAll(x => x.CompCode == compcod);
                return Ok(new BaseResponse(documents));
            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult UserLogin(string UserCode, string Password)

        {
            G_USERS Nusr = new G_USERS();
            //try {
            //    var ussr1 = G_USERSService.GetAll().ToList();
            //    var ussr = G_USERSService.GetAll(x => x.USER_CODE == UserCode).ToList();

            //}
            //catch (Exception e) {
            //    var t = e.Message;
            //}
            var usr = G_USERSService.GetAll(x => x.USER_CODE == UserCode).ToList();
            if (usr.Count == 0)
            {
                return Ok(new BaseResponse(Nusr));  // err on user 
            }
            if (usr[0].USER_PASSWORD == Password && usr[0].USER_ACTIVE == true)
            {

                string Guid = UserTools.GenerateGuid();
                string EnGuid = "HGFD-" + UserTools.Encrypt(Guid, "Business-Systems");
                usr[0].Tokenid = EnGuid;
                if (usr[0].FirstLogin == null)
                    usr[0].FirstLogin = DateTime.Now;
                usr[0].LastLogin = DateTime.Now;
                // update user 
                Nusr = G_USERSService.Update(usr[0]);
                //
                Nusr.Tokenid = Guid;
                return Ok(new BaseResponse(Nusr));
            }
            else
            {
                return Ok(new BaseResponse(Nusr));  // error in pass or active 
            }


        }
        [HttpGet, AllowAnonymous]

        public Boolean CheckUser(string Guid, string uCode)

        {
            string Pref = Guid.Substring(0, 5);
            string OrgGuid = Guid.Remove(0, 5); // remove  prefix 

            string EnGuid = Pref + UserTools.Encrypt(OrgGuid, "Business-Systems");

            var usr = G_USERSService.GetAll(x => x.USER_CODE == uCode).ToList();
            if (usr.Count == 0)
            {
                return false;
            }
            if (usr[0].Tokenid != EnGuid)
            {
                return false;
            }
            if (usr[0].LastLogin == null)
            {
                return false;
            }
            DateTime LL = Convert.ToDateTime(usr[0].LastLogin);
            if (DateTime.Now.Subtract(LL).Hours > 8)
            {
                return false;
            }
            return true;

        }
        [HttpGet, AllowAnonymous]
        public Boolean LogoutUser(string user)

        {
            var usr = G_USERSService.GetAll(x => x.USER_CODE == user).ToList();
            if (usr.Count == 1)
            {
                usr[0].Tokenid = null;
                var Nusr = G_USERSService.Update(usr[0]);
                return true;
            }
            else
            {
                return false;
            }

        }

        [HttpGet, AllowAnonymous]
        public Boolean LogoChangePassword(string user, string NewPass)

        {
            var usr = G_USERSService.GetAll(x => x.USER_CODE == user).ToList();
            if (usr.Count == 1)
            {
                usr[0].CHANGE_PASS_DATE = DateTime.Now;
                usr[0].USER_PASSWORD2 = usr[0].USER_PASSWORD;
                usr[0].USER_PASSWORD = NewPass;
                var Nusr = G_USERSService.Update(usr[0]);
                return true;
            }
            else
            {
                return false;
            }

        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]G_USERS USER)
        {
            if (ModelState.IsValid && CheckUser(USER.Token, USER.UserCode))
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        var usr = G_USERSService.Insert(USER);

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(usr.CompCode), 0, 0, "USERS", "ADD",db);
                        if (res.ResponseState == true)
                        {
                            db.Database.ExecuteSqlCommand("execute GProc_CreateUser '" + usr.USER_CODE + "', '" + usr.DepartmentName + "'");

                            dbTransaction.Commit();
                            return Ok(new BaseResponse(usr));
                        }
                        else
                        {
                            dbTransaction.Rollback();
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

        //[HttpPost, AllowAnonymous]
        //public IHttpActionResult Update(Models.CustomModel.MasterDetailsUsers Model)
        //{
        //    if (ModelState.IsValid && G_USERSService.CheckUser(Model.Token, Model.UserCode))
        //    {
        //        using (var dbTransaction = db.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                var usr = G_USERSService.Update(Model.G_USERS);

        //                db.Database.ExecuteSqlCommand("delete from G_USER_MODULE where user_code ='" + Model.G_USERS.USER_CODE + "' and system_code ='" + Model.G_USERS.SYSTEM_CODE + "'and sub_system_code ='" + Model.G_USERS.SUB_SYSTEM_CODE + "' and module_code not in (select module_code from g_modules where system_code='" + Model.G_USERS.SYSTEM_CODE + "' and sub_system_code= '" + Model.G_USERS.SUB_SYSTEM_CODE + "' and available = 0)");

        //                foreach (var item in Model.G_USER_MODULE)
        //                {
        //                    G_USER_MODULEService.Insert(item);
        //                }


        //                ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(usr.CompCode), 0, 0, "USERS", db);
        //                if (res.ResponseState == true)
        //                {

        //                    dbTransaction.Commit();
        //                    return Ok(new BaseResponse(usr));
        //                }
        //                else
        //                {
        //                    dbTransaction.Rollback();
        //                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
        //                }


        //            }
        //            catch (Exception ex)
        //            {
        //                dbTransaction.Rollback();
        //                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
        //            }

        //        }
        //    }
        //    return BadRequest(ModelState);

        //}

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int shfID, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {

                G_USERSService.Delete(shfID);

                return Ok(new BaseResponse());
            }
            return BadRequest(ModelState);

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetbyID(int id, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                var USER = G_USERSService.GetbyID(id);

                return Ok(new BaseResponse(USER));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetByuserCode(string queryuserCode, string Token, string UserCode)
        {
            if (ModelState.IsValid && CheckUser(Token, UserCode))
            {
                var USER = G_USERSService.GetAll(x => x.USER_CODE == queryuserCode).FirstOrDefault();

                return Ok(new BaseResponse(USER));
            }
            return BadRequest(ModelState);
        }

        //[HttpGet, AllowAnonymous]
        //public IHttpActionResult getDetails(string queryuserCode, string systemCode, string subSystem, bool avail, string Token, string UserCode)
        //{
        //    if (ModelState.IsValid && G_USERSService.CheckUser(Token, UserCode))
        //    {
        //        var model = db.GQ_GetUserModule.Where(x => x.USER_CODE == queryuserCode & x.SYSTEM_CODE == systemCode
        //         & x.SUB_SYSTEM_CODE == subSystem & x.AVAILABLE == avail).ToList().OrderBy(xx => xx.MENU_NO);
        //        return Ok(new BaseResponse(model));
        //    }
        //    return BadRequest(ModelState);
        //}
         

        public static string Encrypt(string input, string key)
        {
            byte[] inputArray = UTF8Encoding.UTF8.GetBytes(input);
            TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider();
            tripleDES.Key = UTF8Encoding.UTF8.GetBytes(key);
            tripleDES.Mode = CipherMode.ECB;
            tripleDES.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tripleDES.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(inputArray, 0, inputArray.Length);
            tripleDES.Clear();
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }

        [HttpGet, AllowAnonymous]
        public Boolean Cheak_UserTokenlog(string user, int compcode, string Branch_Code, string Token)
        {
            string Pref = Token.Substring(0, 5);
            string OrgGuid = Token.Remove(0, 5); // remove  prefix 

            string EnGuid = Pref + Encrypt(OrgGuid, "Business-Systems");

            var usr = G_USERSService.GetAll(x => x.USER_CODE == user).ToList();
            if (usr.Count == 0)
            {
                return false;
            }
            if (usr[0].Tokenid != EnGuid)
            {
                return false;
            }
            if (usr[0].LastLogin == null)
            {
                return false;
            }
            DateTime LL = Convert.ToDateTime(usr[0].LastLogin);
            if (DateTime.Now.Subtract(LL).Hours > 8)
            {
                return false;
            }

            return true;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult InsertLog(string UserCode, int compcode, string BranchCode, string FinYear, bool ISLogin)
        {
            try
            {
                if (ISLogin)
                    //*********Log
                    LogUser.Insert(db, compcode.ToString(), BranchCode, FinYear, UserCode, null,null, LogUser.UserLog.Login, LogUser.PageName.User, true, null, null, null);
                else
                    LogUser.Insert(db, compcode.ToString(), BranchCode, FinYear, UserCode, null,null, LogUser.UserLog.Login, LogUser.PageName.User, false, null, "wrong Login", null);
                return Ok(new BaseResponse());
            }
            catch (Exception ex)
            {

                return BadRequest();
            }
        }
         
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody] MasterDetailsUserRoles USER)
        {
            if (ModelState.IsValid && G_USERSService.CheckUser(USER.Token, USER.UserCode))
            {
                using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        if (USER.G_USERS.Flag_Mastr == "i")
                        {
                            G_USERS usr = G_USERSService.Insert(USER.G_USERS);



                            int SecCreateUser = db.Database.ExecuteSqlCommand("execute GProc_SecCreateUser '" + USER.G_USERS.USER_CODE + "', " + USER.G_USERS.CompCode + "");
                        }
                        else
                        {
                            G_USERS res = G_USERSService.Update(USER.G_USERS);

                        }

                        List<G_RoleUsers> insertedOperationItems = USER.G_RoleUsers.Where(x => x.StatusFlag == 'i').ToList();
                        List<G_RoleUsers> updatedOperationItems = USER.G_RoleUsers.Where(x => x.StatusFlag == 'u').ToList();
                        List<G_RoleUsers> deletedOperationItems = USER.G_RoleUsers.Where(x => x.StatusFlag == 'd').ToList();

                        //loop insered   
                        foreach (G_RoleUsers items in insertedOperationItems)
                        {
                            G_RoleUsers InsertedRec = G_USERSService.InsertRoleUser(items);

                        }

                        //loop Update  
                        foreach (G_RoleUsers items in updatedOperationItems)
                        {

                            G_RoleUsers updatedRec = G_USERSService.UpdateRoleUser(items);
                        }

                        //loop Delete   
                        foreach (G_RoleUsers item in deletedOperationItems)
                        {
                            int deletedId = item.RoleId;
                            string UserCodeE = item.USER_CODE;
                            G_USERSService.DeleteRoleUsers(deletedId, UserCodeE);
                        }


                        List<G_USER_BRANCH> updatedBRANCH = USER.BRANCHDetailsModel.Where(x => x.StatusFlag == 'u').ToList();


                        //loop Update  
                        foreach (G_USER_BRANCH items in updatedBRANCH)
                        {

                            G_USER_BRANCH updatedRec = G_USER_BRANCHService.Update(items);
                        }
                        //LogUser.InsertPrint(db, USER.G_USERS.CompCode.ToString(), USER.Branch_Code.ToString(), USER.sec_FinYear.ToString(), USER.UserCode, Convert.ToInt32( USER.G_USERS.UserCode), LogUser.UserLog.Update, USER.MODULE_CODE, true, null, USER.G_USERS.UserCode.ToString(), null);

                        dbTransaction.Commit();


                        return Ok(new BaseResponse(ModelState));

                    }
                    catch (Exception ex)
                    {
                        //LogUser.InsertPrint(db, USER.G_USERS.CompCode.ToString(), USER.Branch_Code.ToString(), USER.sec_FinYear.ToString(), USER.UserCode, Convert.ToInt32(USER.G_USERS.UserCode), LogUser.UserLog.Update, USER.MODULE_CODE, false, ex.Message, USER.G_USERS.UserCode.ToString(), ex.InnerException.ToString());

                        dbTransaction.Rollback();

                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetUSER(int CompCode, string UserCode, string Token, int? Status, int? UserType)

        {
            string s = "select * from G_USERS where CompCode = " + CompCode;
            string condition = "";
            if (Status != null)
            {
                condition = condition + " and USER_ACTIVE='" + Status + "'";
            }

            if (UserType != null)
            {
                condition = condition + " and USER_TYPE=" + UserType;
            }

            string query = s + condition;
            List<G_USERS> res = db.Database.SqlQuery<G_USERS>(query).ToList();
            return Ok(new BaseResponse(res));
            
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBarnch(int CompCode, string UserCode, string Token)
        {
            string s = "select * from GQ_GetUserBarnchAccess where COMP_CODE = " + CompCode + "";
            string query = s;
            List<GQ_GetUserBarnchAccess> res = db.Database.SqlQuery<GQ_GetUserBarnchAccess>(query).ToList();
            return Ok(new BaseResponse(res));
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBarnchs_byuser(string USER_CODE)
        {
            string query = "select * from GQ_GetUserBarnchAccess where USER_CODE = '" + USER_CODE + "'";
            List<GQ_GetUserBarnchAccess> res = db.Database.SqlQuery<GQ_GetUserBarnchAccess>(query).ToList();
            return Ok(new BaseResponse(res));
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetBarnchs(string COMP_CODE)
        {
            string Query = "select * from G_BRANCH where COMP_CODE=" + COMP_CODE;
            
            List<G_BRANCH> res = db.Database.SqlQuery<G_BRANCH>(Query).ToList();
            return Ok(new BaseResponse(res));
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateUserMasterDetail([FromBody]ModelUserMasterDetail obj)
        {
            if (ModelState.IsValid && G_USERSService.CheckUser(obj.Token, obj.UserCode))
            {
                using (System.Data.Entity.DbContextTransaction dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        G_USERS Users = new G_USERS();
                        G_USER_COMPANY UsersComp = new G_USER_COMPANY();

                        if (obj.StatusFlag == 'i')
                        {

                            Users = G_USERSService.Insert(obj.G_USERS);

                            UsersComp.USER_CODE = Users.USER_CODE;
                            UsersComp.COMP_CODE =int.Parse(obj.Comp_Code);
                            UsersComp.EXECUTE = true;
                            UsersComp.CREATE = true;
                            UsersComp.EDIT = true;
                            UsersComp.DELETE = true;
                            UsersComp.PRINT = true;
                            UsersComp.VIEW = true; 
                            UsersComp = G_USERSService.InsertCompUser(UsersComp);

                            List<G_RoleUsers> InsertedRoles = obj.G_RoleUsers.Where(x => x.StatusFlag == 'i').ToList();
                            List<G_USER_BRANCH> InsertedBranchs = obj.G_USER_BRANCH.Where(x => x.StatusFlag == 'i').ToList();
                            //loop insered  
                            foreach (G_RoleUsers item in InsertedRoles)
                            {
                                item.USER_CODE = Users.USER_CODE;
                                G_RoleUsers InsertedRec = G_USERSService.InsertRoleUser(item);
                            }
                            foreach (G_USER_BRANCH item in InsertedBranchs)
                            {
                                item.USER_CODE = Users.USER_CODE;
                                G_USER_BRANCH InsertedRec = G_USERSService.InsertBranchUser(item);
                            }
                        }
                        else
                        {


                            Users = G_USERSService.Update(obj.G_USERS);
                            List<G_RoleUsers> InsertedRoles = obj.G_RoleUsers.Where(x => x.StatusFlag == 'i').ToList();
                            List<G_RoleUsers> UpdatedRoles = obj.G_RoleUsers.Where(x => x.StatusFlag == 'u').ToList();
                            List<G_RoleUsers> DeletedRoles = obj.G_RoleUsers.Where(x => x.StatusFlag == 'd').ToList();

                            List<G_USER_BRANCH> InsertedBranchs = obj.G_USER_BRANCH.Where(x => x.StatusFlag == 'i').ToList();
                            List<G_USER_BRANCH> UpdatedBranchs = obj.G_USER_BRANCH.Where(x => x.StatusFlag == 'u').ToList();
                            List<G_USER_BRANCH> DeletedBranchs = obj.G_USER_BRANCH.Where(x => x.StatusFlag == 'd').ToList();

                            //loop insered  
                            foreach (G_RoleUsers item in InsertedRoles)
                            {
                                item.USER_CODE = Users.USER_CODE;
                                G_RoleUsers InsertedRec = G_USERSService.InsertRoleUser(item);
                            }
                            foreach (G_USER_BRANCH item in InsertedBranchs)
                            {
                                item.USER_CODE = Users.USER_CODE;
                                G_USER_BRANCH InsertedRec = G_USERSService.InsertBranchUser(item);
                            }

                            //loop Update  
                            //loop Update  
                            foreach (G_RoleUsers item in UpdatedRoles)
                            {
                                db.Database.ExecuteSqlCommand("Update G_RoleUsers set RoleId = " + item.RoleId + " and ISActive = " + item.ISActive + "  where USER_CODE ='" + item.USER_CODE + "' and RoleId = " + item.RoleId + "");
                            }
                            foreach (G_USER_BRANCH item in UpdatedBranchs)
                            {
                                G_USERSService.UpdateBranchUser(item);
                            }
                            //loop Delete  
                            foreach (G_RoleUsers item in DeletedRoles)
                            {
                                G_USERSService.DeleteRoleUsers(item.RoleId, item.USER_CODE);
                            }
                            foreach (G_USER_BRANCH item in DeletedBranchs)
                            {
                                G_USERSService.DeleteBranchUsers(item.BRA_CODE, item.USER_CODE);
                            }
                        }

                        LogUser.Insert(db, obj.G_USERS.CompCode.ToString(), obj.Branch_Code.ToString(), obj.sec_FinYear, obj.UserCode, null,"", LogUser.UserLog.Update, LogUser.PageName.Sales_Services, true, null, "", null);
                        dbTransaction.Commit();
                        return Ok(new BaseResponse(obj.G_USERS.USER_CODE));

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


        [HttpGet, AllowAnonymous]
        public IHttpActionResult CodeFounBefore(string USER_CODE, int compCode, string UserCode, string Token)
        {
            if (ModelState.IsValid && G_USERSService.CheckUser(Token, UserCode))
            {
                List<G_USERS> AccDefVendor = G_USERSService.GetAll(x => x.CompCode == compCode && x.USER_CODE == USER_CODE);

                return Ok(new BaseResponse(AccDefVendor));
            }
            return BadRequest(ModelState);
        }

    }
}

