using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Inv.BLL.Services.VoucherType
{
    public interface IVoucherTypeService
    {
        A_Voucher_Types GetById(int id);
        List<A_Voucher_Types> GetAll();
        List<A_Voucher_Types> GetAll(Expression<Func<A_Voucher_Types, bool>> predicate);

        A_Voucher_Types Insert(A_Voucher_Types entity);
        A_Voucher_Types Update(A_Voucher_Types entity);
        void Delete(int id);
    }
}
