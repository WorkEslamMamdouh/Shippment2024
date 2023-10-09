using Inv.DAL.Domain;
using System.Collections.Generic;

namespace Inv.BLL.Services.ServiceTRInvoice
{
    public interface IServiceTRInvoiceService
    {
        AVAT_TR_SlsInvoice Insert(AVAT_TR_SlsInvoice entity);
        AVAT_TR_SlsInvoice Update(AVAT_TR_SlsInvoice entity);
        void UpdateList(List<AVAT_TR_SlsInvoice> Lstservice);
        AVAT_TR_SlsInvoice GetById(int id);
    }
}
