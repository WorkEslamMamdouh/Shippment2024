using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class StockAdjustMasterDetails : SecurityandUpdateFlagClass
    {
        public I_Stk_TR_Adjust I_Stk_TR_Adjust { get; set; }
        public List<I_Stk_Tr_AdjustDetails> I_Stk_Tr_AdjustDetails { get; set; }
    }
}