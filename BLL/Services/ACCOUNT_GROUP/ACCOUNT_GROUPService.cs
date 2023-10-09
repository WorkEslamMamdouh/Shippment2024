using Inv.DAL.Domain;
using Inv.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Inv.BLL.Services.ACCOUNT_GROUP
{
    public class ACCOUNT_GROUPService : IACCOUNT_GROUPService
    {
        private readonly IUnitOfWork unitOfWork;

        public ACCOUNT_GROUPService(IUnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }


        #region I_D_Category Services
        public A_ACCOUNT_GROUP GetById(int id)
        {
            return unitOfWork.Repository<A_ACCOUNT_GROUP>().GetById(id);
        } 
        public A_ACCOUNT_GROUP InsertMaster(A_ACCOUNT_GROUP entity)
        {
            var memb = unitOfWork.Repository<A_ACCOUNT_GROUP>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public A_ACCOUNT_GROUP UpdateMaster(A_ACCOUNT_GROUP entity)
        {

            var memb = unitOfWork.Repository<A_ACCOUNT_GROUP>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        public A_ACCOUNT_GROUP_DETAIL UpdateDetail(A_ACCOUNT_GROUP_DETAIL entity)
        {

            var memb = unitOfWork.Repository<A_ACCOUNT_GROUP_DETAIL>().Update(entity);
            unitOfWork.Save();
            return memb;
        }
        public A_ACCOUNT_GROUP_DETAIL InsertDetail(A_ACCOUNT_GROUP_DETAIL entity)
        {

            var memb = unitOfWork.Repository<A_ACCOUNT_GROUP_DETAIL>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }
        public void DeleteDetail(int id)
        {
            unitOfWork.Repository<A_ACCOUNT_GROUP_DETAIL>().Delete(id);
            unitOfWork.Save();
        }


        #endregion


    }
}
