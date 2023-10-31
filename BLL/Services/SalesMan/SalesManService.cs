﻿using Inv.DAL.Domain;
using Inv.DAL.Repository; 

namespace Inv.BLL.Services.SalesMan
{
    public class SalesManService : ISalesManService
    {
        private readonly IUnitOfWork unitOfWork;

        public SalesManService(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;
        }

        #region Header Services
        public I_Sls_D_Salesman Insert(I_Sls_D_Salesman entity)
        {
            var Item = unitOfWork.Repository<I_Sls_D_Salesman>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }
        public I_Sls_D_Salesman Update(I_Sls_D_Salesman entity)
        {
            var Item = unitOfWork.Repository<I_Sls_D_Salesman>().Update(entity);
            unitOfWork.Save();
            return Item;
        } 
        #endregion
    }
}
