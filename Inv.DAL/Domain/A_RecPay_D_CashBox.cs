//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inv.DAL.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class A_RecPay_D_CashBox
    {
        public int CashBoxID { get; set; }
        public string CashBox_DescA { get; set; }
        public string CashBox_DescE { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string AccountCode { get; set; }
        public string CardAccountCode { get; set; }
        public string User_Code { get; set; }
        public Nullable<int> BranchCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<bool> IsRecPayAccount { get; set; }
        public Nullable<decimal> MaxDailyExpenses { get; set; }
        public Nullable<decimal> OpenBalance { get; set; }
        public Nullable<System.DateTime> OpenBalanceDate { get; set; }
    }
}
