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
    
    public partial class A_Pay_D_Vendor
    {
        public int VendorID { get; set; }
        public int CompCode { get; set; }
        public string VendorCode { get; set; }
        public Nullable<int> CatID { get; set; }
        public Nullable<int> GroupId { get; set; }
        public string NAMEA { get; set; }
        public string NAMEL { get; set; }
        public string SHORTNAMEA { get; set; }
        public string SHORTNAMEL { get; set; }
        public Nullable<int> NationalityID { get; set; }
        public string RespPersonName { get; set; }
        public string RespPersonMobile { get; set; }
        public string TEL { get; set; }
        public string WorkTel { get; set; }
        public string MOBILE { get; set; }
        public string EMAIL { get; set; }
        public string CURCODE { get; set; }
        public Nullable<int> PurchaserId { get; set; }
        public Nullable<bool> OnPurchaserAcc { get; set; }
        public Nullable<int> AccVendorID { get; set; }
        public Nullable<byte> PaymentType { get; set; }
        public Nullable<decimal> DebitLimit { get; set; }
        public Nullable<decimal> DebitLimitFC { get; set; }
        public Nullable<int> DebitPeriod { get; set; }
        public Nullable<decimal> OpenBalanceFC { get; set; }
        public Nullable<decimal> Openbalance { get; set; }
        public Nullable<decimal> Debit { get; set; }
        public Nullable<decimal> DebitFC { get; set; }
        public Nullable<decimal> Credit { get; set; }
        public Nullable<decimal> CreditFC { get; set; }
        public Nullable<bool> Isactive { get; set; }
        public Nullable<decimal> FCRate { get; set; }
        public string REMARKS { get; set; }
        public Nullable<int> STATUS { get; set; }
        public string CREATED_BY { get; set; }
        public Nullable<System.DateTime> CREATED_AT { get; set; }
        public Nullable<System.DateTime> UPDATED_AT { get; set; }
        public string UPDATED_BY { get; set; }
        public Nullable<byte> VendorType { get; set; }
        public string Bank { get; set; }
        public string BankAccountNo { get; set; }
        public string TaxFileNo { get; set; }
        public string TaxIssuePlace { get; set; }
        public Nullable<byte> VATType { get; set; }
        public Nullable<byte> AddDedType { get; set; }
        public string VATNo { get; set; }
        public string AddDedNo { get; set; }
        public Nullable<bool> IsWebEnabled { get; set; }
        public string WebUserName { get; set; }
        public string WebPassword { get; set; }
        public Nullable<bool> IsCreditVendor { get; set; }
        public string IDNo { get; set; }
        public string OperationFixed { get; set; }
        public string OperationSer { get; set; }
        public string Address_postal { get; set; }
        public string Address_Province { get; set; }
        public string GroupVatNo { get; set; }
        public string Address_Street { get; set; }
        public string Address_Str_Additional { get; set; }
        public string Address_BuildingNo { get; set; }
        public string Address_Build_Additional { get; set; }
        public string Address_City { get; set; }
        public string Address_District { get; set; }
        public Nullable<System.DateTime> OpenbalanceAt { get; set; }
    }
}
