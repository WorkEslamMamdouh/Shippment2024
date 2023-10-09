using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class PurInvoiceRetMasterDetails : SecurityandUpdateFlagClass
    {
            public AVAT_TR_PurInvoiceRet AVAT_TR_PurInvoiceRet { get; set; }
            public List<AVAT_TR_PurInvoiceRetDetail> AVAT_TR_PurInvoiceRetDetail { get; set; }
          

    }
}