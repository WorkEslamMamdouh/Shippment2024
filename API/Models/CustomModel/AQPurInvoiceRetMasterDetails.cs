using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class AQPurInvoiceRetMasterDetails 
    {
            public AVAT_TR_PurInvoiceRet AVAT_TR_PurInvoiceRet { get; set; }
            public List<AQVAT_GetPurReturnDetail> AQVAT_GetPurReturnDetail { get; set; }
           

    }
}