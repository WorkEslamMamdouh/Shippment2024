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
    
    public partial class IQ_GetTransfer
    {
        public int TransfareID { get; set; }
        public Nullable<int> Tr_No { get; set; }
        public string RefNO { get; set; }
        public Nullable<int> TrType { get; set; }
        public Nullable<int> TFType { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string TrDateH { get; set; }
        public Nullable<int> SenderBranchCode { get; set; }
        public Nullable<int> ReceiverBranchCode { get; set; }
        public Nullable<int> SenderStoreID { get; set; }
        public Nullable<int> ReceiverStoreID { get; set; }
        public Nullable<int> RequestTransferID { get; set; }
        public string Remark { get; set; }
        public Nullable<int> SendTransferID { get; set; }
        public string RequestedBy { get; set; }
        public string SendBy { get; set; }
        public string ReceivedBy { get; set; }
        public string VerfiedBy { get; set; }
        public Nullable<decimal> Total { get; set; }
        public Nullable<bool> IsPosted { get; set; }
        public Nullable<int> VoucherNo { get; set; }
        public Nullable<byte> VoucherType { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<int> BranchCode { get; set; }
        public Nullable<bool> IsSent { get; set; }
        public Nullable<bool> IsReceived { get; set; }
        public Nullable<bool> IsRequested { get; set; }
        public string SBr_DescA { get; set; }
        public string SBr_DescE { get; set; }
        public string SSt_DescA { get; set; }
        public string SSt_DescE { get; set; }
        public Nullable<int> SSt_Store_Code { get; set; }
        public string RBr_DescA { get; set; }
        public string RBr_DescE { get; set; }
        public string RSt_DescA { get; set; }
        public Nullable<int> RSt_StoreCode { get; set; }
        public string RSt_DescE { get; set; }
    }
}
