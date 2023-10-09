using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Inv.BLL.Services.G_LnkTran
{
    public interface IG_LnkTransService
    {
        G_LnkTrans GetById(int id);
        List<G_LnkTrans> GetAll();
        List<G_LnkTrans> GetAll(Expression<Func<G_LnkTrans, bool>> predicate);
    }
}
