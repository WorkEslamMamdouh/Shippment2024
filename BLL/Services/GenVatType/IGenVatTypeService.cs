using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.GenVatType
{
    public interface IGenVatTypeService
    {
        A_D_VAT_TYPE GetById(int id);
        List<A_D_VAT_TYPE> GetAll();
        List<A_D_VAT_TYPE> GetAll(Expression<Func<A_D_VAT_TYPE, bool>> predicate);
    }

}
