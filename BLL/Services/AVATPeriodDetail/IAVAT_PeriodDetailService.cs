using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.AVATPeriodDetail
{


    public interface IAVAT_PeriodDetailService
    {
        List<AVAT_PeriodDetail> GetAll();
        List<AVAT_PeriodDetail> GetAll(Expression<Func<AVAT_PeriodDetail, bool>> predicate);
        AVAT_PeriodDetail Insert(AVAT_PeriodDetail entity);
        AVAT_PeriodDetail Update(AVAT_PeriodDetail entity);
        AVAT_PeriodDetail GetById(int id);
        void Delete(int id);
    }


}
