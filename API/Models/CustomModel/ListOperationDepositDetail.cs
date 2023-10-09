using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class ListOperationDepositDetail : SecurityandUpdateFlagClass
    { 
        public List<I_TR_OperationSalesmanItem> I_TR_OperationSalesmanItem { get; set; }
        public List<I_TR_OperationDeposit> I_TR_OperationDeposit { get; set; }
    }
}