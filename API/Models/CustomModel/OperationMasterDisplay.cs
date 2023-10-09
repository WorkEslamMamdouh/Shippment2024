using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class OperationMasterDisplay : SecurityandUpdateFlagClass
    {
            
            public List<IQ_GetOperationItemInfo> IQ_GetOperationItemInfo { get; set; }
            public List<IQ_GetOperationCharges> IQ_GetOperationCharges { get; set; }
            public List<IQ_GetOperationDepsit> I_TR_OperationDeposit { get; set; }
            public List<IQ_GetOperationSalesman> TR_OperationSalesman { get; set; }
            public List<IQ_GetOperationSalesmanItem> TR_OperationSalesmanItem { get; set; }



    }
}