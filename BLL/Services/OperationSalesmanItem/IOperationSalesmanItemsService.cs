using Inv.DAL.Domain;
using System.Collections.Generic;

namespace Inv.BLL.Services.OperationSalesmanItem
{
    public interface IOperationSalesmanItemsService
    {
        void InsertLst(List<I_TR_OperationSalesmanItem> obj);
        I_TR_OperationSalesmanItem Insert(I_TR_OperationSalesmanItem entity);
        I_TR_OperationSalesmanItem Update(I_TR_OperationSalesmanItem entity);
        void Delete(int id);
    }
}
