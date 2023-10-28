using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.SellerOrder
{
    public interface ISellerOrderService
    {
        A_Rec_D_Customer InsertCustomer (A_Rec_D_Customer entity);
        A_Rec_D_Customer UpdateCustomer (A_Rec_D_Customer entity); 
        I_Sls_TR_Invoice InsertIvoice(I_Sls_TR_Invoice entity);
        I_Sls_TR_Invoice UpdateIvoice(I_Sls_TR_Invoice entity);
        I_Item Insert(I_Item entity);
        I_Item Update(I_Item entity);
        I_Sls_TR_InvoiceItems Insert(I_Sls_TR_InvoiceItems entity);
        I_Sls_TR_InvoiceItems Update(I_Sls_TR_InvoiceItems entity);

    }
}
