using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.SlsInvoice
{
    public interface ISlsInvoiceService
    { 
        Sls_Invoice InsertInvoice(Sls_Invoice entity);
        Sls_Invoice UpdateInvoice(Sls_Invoice entity);
         Sls_InvoiceItem InsertInvItems (Sls_InvoiceItem entity);
         Sls_InvoiceItem UpdateInvItems (Sls_InvoiceItem entity); 
        void DeleteInvItems(int id);

    }
}
