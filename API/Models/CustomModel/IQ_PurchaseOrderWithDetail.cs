using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class IQ_PurchaseOrderWithDetail : SecurityandUpdateFlagClass
    {
        public List<IQ_GetPurchaseOrder> IQ_GetPurchaseOrder { get; set; }
        public List<IQ_GetPurchaseOrderDetail> IQ_GetPurchaseOrderDetail { get; set; }
    }
}