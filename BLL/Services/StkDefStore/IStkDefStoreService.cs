using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.StkDefStore
{
    public interface IStkDefStoreService
    {
        G_STORE GetById(int id);
        List<G_STORE> GetAll();
        List<G_STORE> GetAll(Expression<Func<G_STORE, bool>> predicate);
    }
}
