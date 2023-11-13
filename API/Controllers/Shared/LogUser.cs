//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;
using System;
using Inv.DAL.Domain;

namespace Inv.API.Controllers
{
    public class LogUser
    {
        //    public static enum
        public enum UserLog
        {
            Login = 1,
            Logout = 3,
            Insert = 10,
            Update = 11,
            Delete = 12,
            UpdateList = 13,
            Query = 20,
            print = 21,
            Open= 22,
            //AllSuccess = 23,
            OpenScreen = 5,
            View = 24 ,
            PrintList = 25 
        }
        public enum PageName
        {
            Coding_item,
            VendorControl,
            DirectTransfer,
            SlsTrSalesManager,
            Sales_Services,
            Ser_Return_Sales,
            Ser_Purchasing,
            Invoice,
            InvoiceReturn,
            Customer,
            PurOrder,
            PurTrReceive,
            PurTrReturn,
            AccDefCustomer,
            StkDefUnitGroup,
            StkDefItemsNew,
            DefStore,
            StkDefItemType,
            AccTrReceiptNote,
            AccTrCustomerAdjust,
            AccDefVendor,
            GenDefVendorCat,
            GenDefGroup,
            AccTrVendorAdjust,
            TranPosting,
            ID_Uom,
            User

        }
        public static void Insert(InvEntities _db, string COMP_CODE, string BranchCode, string FinYear, string USER_CODE,
        int? DataId, string TrNo, UserLog OperationId, PageName PageName, bool ISSucceed, string ErrorMessage, string ErrorNo, string Info)
        {
            try
            {
                

                string dateValue = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");

                string sql = @"INSERT INTO  G_USER_LOG( USER_CODE, SYSTEM_CODE, COMP_CODE, BranchCode, FinYear, TimeStamp, MODULE_CODE, OperationId, DataID, ISSucceed, ErrorMessage, ExtraData) 
                            VALUES ('" + USER_CODE + "','I' ," + Convert.ToInt32(COMP_CODE) + "," + Convert.ToInt32(BranchCode) + ", " + short.Parse(FinYear) + ",'" + dateValue + "' ," + @"
                                   '" + PageName + "','" + Convert.ToByte(OperationId) + "', '" + DataId + "' ,'" + ISSucceed + "', '" + ErrorMessage + "' , '"+ Info + "') ";

                _db.Database.ExecuteSqlCommand(sql);
                //G_USER_LOG obj = new G_USER_LOG();

                //obj.COMP_CODE = Convert.ToInt32(COMP_CODE);
                //obj.BranchCode = Convert.ToInt32(BranchCode);
                //obj.FinYear = short.Parse(FinYear);
                //obj.USER_CODE = USER_CODE;

                ////***const
                //obj.SYSTEM_CODE = "I";
                //obj.TimeStamp = DateTime.Now;
                //obj.ExtraData = Info;

                ////***Data
                //obj.DataID = DataId;
                //obj.ErrorMessage = ErrorMessage;
                ////obj.ErrorNo = ErrorNo;
                //obj.ISSucceed = ISSucceed;
                //obj.MODULE_CODE = PageName.ToString();
                //obj.OperationId = Convert.ToByte(OperationId);//G Code  ()
                //_db.G_USER_LOG.Add(obj);
                //_db.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                var m = ex.Message;
                return;
            }
        }

        public static void InsertPrint(InvEntities _db, string COMP_CODE, string BranchCode, string FinYear, string USER_CODE,
       int? DataId, string TrNo, UserLog OperationId, string ModuleCode, bool ISSucceed, string ErrorMessage, string ErrorNo, string Info)
        {
            try
            {
                if (TrNo.Trim() != "" && TrNo != null)
                {
                    ErrorNo = TrNo;
                }

                string dateValue = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");

                string sql = @"INSERT INTO  G_USER_LOG( USER_CODE, SYSTEM_CODE, COMP_CODE, BranchCode, FinYear, TimeStamp, MODULE_CODE, OperationId, DataID, ISSucceed, ErrorMessage, ExtraData) 
                            VALUES ('" + USER_CODE + "','I' ," + Convert.ToInt32(COMP_CODE) + "," + Convert.ToInt32(BranchCode) + ", " + short.Parse(FinYear) + ",'" + dateValue + "' ," + @"
                                   '" + ModuleCode + "','" + Convert.ToByte(OperationId) + "', '" + DataId + "' ,'" + ISSucceed + "', '" + ErrorMessage + "' , '"+ ErrorNo + "') ";

                _db.Database.ExecuteSqlCommand(sql);

                //G_USER_LOG obj = new G_USER_LOG();
                ////***const
                //obj.SYSTEM_CODE = "I";

                //obj.TimeStamp = DateTime.Now;
                //obj.ExtraData = Info;
                ////***session
                //obj.COMP_CODE = Convert.ToInt32(COMP_CODE);
                //obj.BranchCode = Convert.ToInt32(BranchCode);
                //obj.FinYear = short.Parse(FinYear);
                //obj.USER_CODE = USER_CODE;
                ////***
                //obj.DataID = DataId;
                //obj.ErrorMessage = ErrorMessage;
                ////obj.ErrorNo = ErrorNo;
                //obj.ISSucceed = ISSucceed;
                //obj.MODULE_CODE = ModuleCode;
                // obj.OperationId = Convert.ToByte(OperationId);//G Code  ()
                //_db.G_USER_LOG.Add(obj);
                //_db.SaveChanges();
                return;
            }
            catch (Exception ex)
            {
                var m = ex.Message;
                return;
            }
        }

        
    }
}