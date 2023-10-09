using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class DirectTransferMasterDetails : SecurityandUpdateFlagClass
    {
        public I_Stk_TR_Transfer I_Stk_TR_Transfer { get; set; }
        public List<I_Stk_TR_TransferDetails> I_Stk_TR_TransferDetails { get; set; }
    }
}