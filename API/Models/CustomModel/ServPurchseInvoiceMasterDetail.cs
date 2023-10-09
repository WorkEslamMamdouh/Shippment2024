using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class ServPurchseInvoiceMasterDetail : SecurityandUpdateFlagClass
    {
        public AVAT_TR_PurInvoice AVAT_TR_PurInvoice { get; set; }
        public List<AVAT_TR_PurInvoiceDetail> AVAT_TR_PurInvoiceDetail { get; set; }
        public List<AVAT_TR_PurInvoiceHeader> AVAT_TR_PurInvoiceHeader { get; set; }
    }
}