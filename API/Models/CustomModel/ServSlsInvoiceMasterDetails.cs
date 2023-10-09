using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class ServSlsInvoiceMasterDetails : SecurityandUpdateFlagClass
    {
        public AVAT_TR_SlsInvoice AVAT_TR_SlsInvoice { get; set; }
        public List<AVAT_TR_SlsInvoiceItem> AVAT_TR_SlsInvoiceItem { get; set; }
    }
}