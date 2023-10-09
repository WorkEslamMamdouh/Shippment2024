using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class ICollectMasterDetails : SecurityandUpdateFlagClass
    {
            public I_TR_Collect I_TR_Collect { get; set; }
            public List<I_TR_CollectDetail> I_TR_CollectDetail { get; set; }
         

    }
}