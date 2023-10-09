using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class IQ_GetPurReceiveMasterDisplay : SecurityandUpdateFlagClass
    {
            
            public List<IQ_GetPurReceiveItem> IQ_GetPurReceiveItem { get; set; }
            public List<IQ_GetPurReceiveCharge> IQ_GetPurReceiveCharge { get; set; }

    }
}