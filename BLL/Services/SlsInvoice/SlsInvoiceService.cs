using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.SlsInvoice
{
    public  class SlsInvoiceService : ISlsInvoiceService
    {
        private readonly IUnitOfWork unitOfWork;

        public SlsInvoiceService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


        #region SellerOrderService Services
          
        public Sls_Invoice InsertInvoice (Sls_Invoice entity)
        {

            var Invoice = unitOfWork.Repository<Sls_Invoice>().Insert(entity);
            unitOfWork.Save();
            return Invoice;
        } 
        public Sls_Invoice UpdateInvoice(Sls_Invoice entity)
        {

            var Invoice = unitOfWork.Repository<Sls_Invoice>().Update(entity);
            unitOfWork.Save();
            return Invoice;
        }

        public Sls_InvoiceItem InsertInvItems(Sls_InvoiceItem entity)
        {

            var Invoice = unitOfWork.Repository<Sls_InvoiceItem>().Insert(entity);
            unitOfWork.Save();
            return Invoice;
        }
        public Sls_InvoiceItem UpdateInvItems(Sls_InvoiceItem entity)
        {

            var Invoice = unitOfWork.Repository<Sls_InvoiceItem>().Update(entity);
            unitOfWork.Save();
            return Invoice;
        }  
        public void DeleteInvItems(int id)
        {
            unitOfWork.Repository<Sls_InvoiceItem>().Delete(id);
            unitOfWork.Save();
        }

        #endregion

    }
}
