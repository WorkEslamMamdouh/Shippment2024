using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.VatNature
{
    public interface IVatNatureService
    {
        G_VatNature GetById(int id);
        List<G_VatNature> GetAll();
        List<G_VatNature> GetAll(Expression<Func<G_VatNature, bool>> predicate);
    }

}
