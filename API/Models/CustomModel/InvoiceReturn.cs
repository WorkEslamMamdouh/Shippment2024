using Inv.DAL.Domain;
using System.Collections.Generic;


namespace Inv.API.Models.CustomModel
{
    public class InvoiceReturn
    {
        public int CompCode  { get; set; }
        public int BranchCode { get; set; }
        public int InvoiceID  { get; set; }
        public int InvoiceItemID { get; set; }
        public decimal ItemQty { get; set; }
        public string UserCode  { get; set; }
  
    }
}
