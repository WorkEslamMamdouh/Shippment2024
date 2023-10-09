using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.VoucherType
{
    public class VoucherTypeService : IVoucherTypeService
    {
        private readonly IUnitOfWork unitOfWork;

        public VoucherTypeService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }
        #region VoucherTypeService Service

        public A_Voucher_Types GetById(int id)
        {
            return unitOfWork.Repository<A_Voucher_Types>().GetById(id);
        }

        public List<A_Voucher_Types> GetAll()
        {
            return unitOfWork.Repository<A_Voucher_Types>().GetAll();
        }

        public List<A_Voucher_Types> GetAll(Expression<Func<A_Voucher_Types, bool>> predicate)
        {
            return unitOfWork.Repository<A_Voucher_Types>().Get(predicate);
        }

        public A_Voucher_Types Insert(A_Voucher_Types entity)
        {
            var memb = unitOfWork.Repository<A_Voucher_Types>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public A_Voucher_Types Update(A_Voucher_Types entity)
        {

            var memb = unitOfWork.Repository<A_Voucher_Types>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        { 
            unitOfWork.Repository<A_Voucher_Types>().Delete(id);
            unitOfWork.Save();
        }
        #endregion
    }
}
