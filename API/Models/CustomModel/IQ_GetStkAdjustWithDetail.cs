using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class IQ_GetStkAdjustWithDetail : SecurityandUpdateFlagClass
    {
        public List<IQ_GetStkAdjust> IQ_GetStkAdjust { get; set; }
        public List<IQ_GetStkAdjustDetail> IQ_GetStkAdjustDetail { get; set; }
    }
}

 