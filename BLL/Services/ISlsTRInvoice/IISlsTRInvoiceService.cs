using Inv.DAL.Domain;
using System.Collections.Generic;

namespace Inv.BLL.Services.ISlsTRInvoice
{
    public interface IISlsTRInvoiceService
    {
        I_Sls_TR_Invoice Insert(I_Sls_TR_Invoice entity);
        I_Sls_TR_Invoice Update(I_Sls_TR_Invoice entity);
        void UpdateList(List<I_Sls_TR_Invoice> Lstservice);
        I_Sls_TR_Invoice GetById(int id);
        //List<IQ_GetItemStoreInfo> GetAll();
        //List<IQ_GetItemStoreInfo> GetAll(Expression<Func<IQ_GetItemStoreInfo, bool>> predicate);
        //I_Item Insert(I_Item entity);

        //void Delete(int id);
        //// void UpdateList(List<I_Item> Lstservice);
    }
}
