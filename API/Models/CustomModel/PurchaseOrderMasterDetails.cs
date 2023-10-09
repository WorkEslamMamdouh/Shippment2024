using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class PurchaseOrderMasterDetails : SecurityandUpdateFlagClass
    {
        public I_Pur_Tr_PurchaseOrder I_Pur_Tr_PurchaseOrder { get; set; }
        public List<I_Pur_Tr_PurchaseOrderDetail> I_Pur_Tr_PurchaseOrderDetail { get; set; }
    }
}