using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.SellerOrder
{
    public  class SellerOrderService : ISellerOrderService
    {
        private readonly IUnitOfWork unitOfWork;

        public SellerOrderService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


        #region SellerOrderService Services
         
        public A_Rec_D_Customer InsertCustomer(A_Rec_D_Customer entity)
        {
            var Customer = unitOfWork.Repository<A_Rec_D_Customer>().Insert(entity);
            unitOfWork.Save();
            return Customer;
        } 
        public A_Rec_D_Customer UpdateCustomer(A_Rec_D_Customer entity)
        {
            var Customer = unitOfWork.Repository<A_Rec_D_Customer>().Update(entity);
            unitOfWork.Save();
            return Customer;
        }

        public I_Sls_TR_Invoice InsertIvoice (I_Sls_TR_Invoice entity)
        {

            var Invoice = unitOfWork.Repository<I_Sls_TR_Invoice>().Insert(entity);
            unitOfWork.Save();
            return Invoice;
        } 
        public I_Sls_TR_Invoice UpdateIvoice (I_Sls_TR_Invoice entity)
        {

            var Invoice = unitOfWork.Repository<I_Sls_TR_Invoice>().Insert(entity);
            unitOfWork.Save();
            return Invoice;
        }
        public I_Item Insert(I_Item entity)
        {
            var Item = unitOfWork.Repository<I_Item>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }

        public I_Item Update(I_Item entity)
        {

            var Item = unitOfWork.Repository<I_Item>().Update(entity);
            unitOfWork.Save();
            return Item;
        }
         
        public I_Sls_TR_InvoiceItems Insert(I_Sls_TR_InvoiceItems entity)
        {
            var AccDefAccount = unitOfWork.Repository<I_Sls_TR_InvoiceItems>().Insert(entity);
            unitOfWork.Save();
            return AccDefAccount;
        }

        public I_Sls_TR_InvoiceItems Update(I_Sls_TR_InvoiceItems entity)
        {

            var AccDefAccount = unitOfWork.Repository<I_Sls_TR_InvoiceItems>().Update(entity);
            unitOfWork.Save();
            return AccDefAccount;
        }
        #endregion

    }
}
