﻿using System;

namespace Inv.DAL.Domain
{
    public class UpdateFlagClass
    {
        public char StatusFlag { get; set; }
    }
    public class SecurityClass
    {
        public string UserCode { get; set; }
        public string Token { get; set; }
    }

  
    public class SecurityandIsLocalSalePriceFlagClass
    {
        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; } 
        public string CompName { get; set; }
        public string VatNo { get; set; }
        public Boolean IsLocalSalePrice { get; set; }
    }
    public class SecurityandUpdateFlagClass
    {
        public char FlagUpdate { get; set; }
        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; } 
        public string CompName { get; set; }
        public string VatNo { get; set; }

        public string Branch_Code { get; set; }
        public string Comp_Code { get; set; }
        public string sec_FinYear { get; set; }
        public string MODULE_CODE { get; set; }
        public int FIN_YEAR { get; set; }
        public int OldID { get; set; }



    }
    public class SecurityandUpdateFlagClass_FIN_YEAR
    {
        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
        public int FIN_YEAR { get; set; }
    }
      
    public class SecurityClass_G_USERS
    {
        public string UserCode { get; set; }
        public string Token { get; set; }
        public string Flag_Mastr { get; set; }

    }
    public class SecurityandUpdateFlagClass_serial
    {
        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
        public string serial_num{ get; set; }

        public string Branch_Code { get; set; }
        public string Comp_Code { get; set; }
        public string sec_FinYear { get; set; }
        public string MODULE_CODE { get; set; }
        public int FIN_YEAR { get; set; }

    }
    public class VoucherStatusClass
    {

        public char StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
        public int OpCode { get; set; }

        public string Branch_Code { get; set; }
        public string Comp_Code { get; set; }
        public string sec_FinYear { get; set; }
        public string MODULE_CODE { get; set; }
        public int FIN_YEAR { get; set; }


    }
   
    public partial class G_USERS : SecurityClass_G_USERS
    {

    }
    public partial class FamilyZone : SecurityandUpdateFlagClass
    {

    }
    public partial class Zones : SecurityandUpdateFlagClass
    {

    }
    public partial class G_RoleUsers : SecurityandUpdateFlagClass
    {

    } 
    public partial class A_ACCOUNT : SecurityandUpdateFlagClass_FIN_YEAR
    {

    }
    public partial class AQ_GetAccount : SecurityandUpdateFlagClass_FIN_YEAR
    {

    } 
    public partial class I_Sls_D_Salesman : SecurityandUpdateFlagClass
    {
    }
    public partial class A_RecPay_D_CashBox : SecurityandUpdateFlagClass
    {
    }
    public partial class Sls_InvoiceItem: SecurityandUpdateFlagClass
    {
    }
    public partial class A_RecPay_Tr_ReceiptNote : SecurityandUpdateFlagClass
    {
    }  
    public partial class G_COST_CENTER : SecurityandUpdateFlagClass
    {
    }
      public partial class G_CONTROL : SecurityandUpdateFlagClass
    {
    }  
    public partial class G_SUB_SYSTEMS : SecurityandUpdateFlagClass
    {
    }public partial class G_LnkTrans : SecurityandUpdateFlagClass
    {
    }
    public partial class G_LnkTransVoucher : SecurityandUpdateFlagClass_serial
    {
    }
    public partial class G_LnkTransVariable : SecurityandUpdateFlagClass
    {
    }
    public partial class G_LnkVar : SecurityandUpdateFlagClass
    {
    }
    public partial class I_Stk_TR_TransferDetails : SecurityandUpdateFlagClass
    {
    }
    public partial class G_USER_BRANCH : UpdateFlagClass
    {
    }
    public partial class I_Stk_Tr_AdjustDetails : SecurityandUpdateFlagClass
    {
    }
    public partial class I_Stk_Tr_OpenDetails : UpdateFlagClass
    {
    }
    public partial class I_Pur_D_Charges : SecurityandUpdateFlagClass
    {
    }
    public partial class I_Pur_Tr_PurchaseOrderDetail : SecurityandUpdateFlagClass
    {
    }
    public partial class G_STORE : SecurityandUpdateFlagClass
    {
    }
    public partial class I_TR_OperationTFDetail : SecurityandUpdateFlagClass
    {
    }
    public partial class A_Pay_D_VendorDoc : SecurityandUpdateFlagClass
    {
    }
    public partial class A_Rec_D_CustomerDoc : SecurityandUpdateFlagClass
    {
    }
    public partial class AVAT_D_SrvCategory : SecurityandUpdateFlagClass
    {
    } 
    public partial class AVAT_TR_PurInvoice : SecurityClass
    {
    }

    public partial class AVAT_TR_PurInvoiceDetail : SecurityandUpdateFlagClass
    {
    }
    public partial class AVAT_TR_PurInvoiceHeader : SecurityandUpdateFlagClass
    {
    }

    public partial class AVAT_TR_SlsInvoiceItem : SecurityandUpdateFlagClass
    {
    }
    public partial class AVAT_TR_PurInvoiceRet : SecurityandUpdateFlagClass
    {
    }
    public partial class G_COMPANY : SecurityandUpdateFlagClass
    {
    }
    public partial class G_AlertControl : SecurityClass
    {
    }
    public partial class A_CCDT_Types : SecurityClass
    {
    }
    public partial class A_CCDT_COSTCENTERS : SecurityandUpdateFlagClass
    {
    }
    public partial class AVAT_CONTROL : SecurityandUpdateFlagClass
    {
    }
    public partial class AVAT_PERIOD : SecurityClass
    {
    }
    public partial class AVAT_TRANS : SecurityClass
    {
    }
    public partial class A_CashVoucher_Detail : SecurityandUpdateFlagClass
    {
    }
        public partial class A_CashVoucher_Header : SecurityandUpdateFlagClass
    {
    }
    public partial class AVAT_D_Service : SecurityandUpdateFlagClass
    {
    }
    public partial class G_BRANCH : SecurityandUpdateFlagClass
    {
    }  
    public partial class I_TR_Collect : SecurityandUpdateFlagClass
    {
    }
    public partial class I_TR_CollectDetail : UpdateFlagClass
    { 
    }
    public partial class I_Period : SecurityandUpdateFlagClass_FIN_YEAR
    {
    }
    public partial class I_D_IssueType : SecurityandUpdateFlagClass
    {
    }
    public partial class I_Stk_TR_IssueToCCDetails : SecurityandUpdateFlagClass_FIN_YEAR
    {
    }
        public partial class AQ_GetLnkVoucher : SecurityandUpdateFlagClass
    {
    }
    public partial class A_ACCOUNT_GROUP_DETAIL : SecurityandUpdateFlagClass
    {
    }
    public partial class A_LnkVoucher : SecurityandUpdateFlagClass
    {
    }
    public partial class G_RoleBranch : SecurityandUpdateFlagClass
    {
    }
    public partial class G_RoleModule : SecurityandUpdateFlagClass
    {
    }
    public partial class G_MODULES : SecurityandUpdateFlagClass
    {
    }
     
    
}
