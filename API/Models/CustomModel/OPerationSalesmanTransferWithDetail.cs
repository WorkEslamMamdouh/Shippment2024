using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class OPerationSalesmanTransferWithDetail : SecurityandUpdateFlagClass
    {
        public I_TR_OperationTF I_TR_OperationTF { get; set; }
        public List<I_TR_OperationTFDetail> I_TR_OperationTFDetail { get; set; }
    }
}