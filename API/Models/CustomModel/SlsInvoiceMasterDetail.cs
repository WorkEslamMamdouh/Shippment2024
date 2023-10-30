using Inv.DAL.Domain;
using System.Collections.Generic;


namespace Inv.API.Models.CustomModel
{
    public class SlsInvoiceMasterDetail
    {
        public Sls_Invoice Sls_Invoice { get; set; }
        public List<Sls_InvoiceItem> Sls_InvoiceItem { get; set; }
        
 
         
    }
}
