using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Inv.BLL.Services.G_SUB_SYSTEM
{
    public interface IG_SUB_SYSTEMSService
    {
        G_SUB_SYSTEMS GetById(int id);
        List<G_SUB_SYSTEMS> GetAll();
        List<G_SUB_SYSTEMS> GetAll(Expression<Func<G_SUB_SYSTEMS, bool>> predicate);
    }
}
