using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class IQ_DirectTransferWithDetail : SecurityandUpdateFlagClass
    {
        public List<IQ_GetTransfer> IQ_GetTransfer { get; set; }
        public List<IQ_GetTransferDetail> IQ_GetTransferDetail { get; set; }
    }
}