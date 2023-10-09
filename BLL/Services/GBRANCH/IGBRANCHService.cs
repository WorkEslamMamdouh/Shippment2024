using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Inv.BLL.Services.GBRANCH
{
    public interface IGBRANCHService
    {
        G_BRANCH GetById(int id);
        List<G_BRANCH> GetAll();
        List<G_BRANCH> GetAll(Expression<Func<G_BRANCH, bool>> predicate);
        G_BRANCH Insert(G_BRANCH entity);
        G_BRANCH Update(G_BRANCH entity);
    }
}
