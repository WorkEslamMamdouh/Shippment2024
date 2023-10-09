using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class IQ_GetOPerationTransferWithDetail : SecurityandUpdateFlagClass
    {
        public List<IQ_GetOperationTF> IQ_GetOperationTF { get; set; }
        public List<IQ_GetOperationTFDetail> IQ_GetOperationTFDetail { get; set; }
    }
}