using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class IQCollectMasterDetails : SecurityClass
    {
            public I_TR_Collect I_TR_Collect { get; set; }
            public List<IQ_GetCollectDetail> IQ_GetCollectDetail { get; set; }
         

    }
}