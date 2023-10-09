using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.AccDefAccounts
{
    public interface IAccDefAccountsService
    {
        A_RecPay_D_Accounts GetById(int id);
        List<A_RecPay_D_Accounts> GetAll();
        List<A_RecPay_D_Accounts> GetAll(Expression<Func<A_RecPay_D_Accounts, bool>> predicate);
        A_RecPay_D_Accounts Insert(A_RecPay_D_Accounts entity);
        A_RecPay_D_Accounts Update(A_RecPay_D_Accounts entity);
        void Delete(int id);
        void UpdateList(List<A_RecPay_D_Accounts> Lstservice);
    }
}
