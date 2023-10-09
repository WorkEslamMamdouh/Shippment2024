using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.VchrTemplateHeader
{
    public interface IVchrTemplateHeaderService
    {
        List<A_TR_VchrTemplate> GetAll(Expression<Func<A_TR_VchrTemplate, bool>> predicate);
        A_TR_VchrTemplate Insert(A_TR_VchrTemplate entity);
        A_TR_VchrTemplate Update(A_TR_VchrTemplate entity);
        void UpdateList(List<A_TR_VchrTemplate> Lstservice);
        A_TR_VchrTemplate GetById(int id);
        void Delete(int id);
    }
}
