using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Inv.BLL.Services.PurDefCharges
{
    public interface IPurDefChargesService
    {
        I_Pur_D_Charges GetById(int id);
        List<I_Pur_D_Charges> GetAll();
        List<I_Pur_D_Charges> GetAll(Expression<Func<I_Pur_D_Charges, bool>> predicate);
    }
}
