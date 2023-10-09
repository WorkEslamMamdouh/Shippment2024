using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class StockOpenMasterDetails : SecurityandUpdateFlagClass
    {
        public I_Stk_TR_Open I_Stk_TR_Open { get; set; }
        public List<I_Stk_Tr_OpenDetails> I_Stk_Tr_OpenDetails { get; set; }
    }
}


 