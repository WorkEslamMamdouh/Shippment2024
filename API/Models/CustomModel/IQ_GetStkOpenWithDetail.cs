using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class IQ_GetStkOpenWithDetail : SecurityandUpdateFlagClass
    {
        public List<I_Stk_TR_Open> I_Stk_TR_Open { get; set; }
        public List<IQ_GetStkOpenDetail> IQ_GetStkOpenDetail { get; set; }
    }
}