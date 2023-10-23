using Inv.DAL.Domain;
using Inv.DAL.Repository; 

namespace Inv.BLL.Services.Seller
{
    public class SellerService : ISellerService
    {
        private readonly IUnitOfWork unitOfWork;

        public SellerService(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;
        }

        #region Header Services
        public A_Pay_D_Vendor Insert(A_Pay_D_Vendor entity)
        {
            var Item = unitOfWork.Repository<A_Pay_D_Vendor>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }
        public A_Pay_D_Vendor Update(A_Pay_D_Vendor entity)
        {
            var Item = unitOfWork.Repository<A_Pay_D_Vendor>().Update(entity);
            unitOfWork.Save();
            return Item;
        }
        public G_USERS Insert(G_USERS entity)
        {
            var Item = unitOfWork.Repository<G_USERS>().Update(entity);
            unitOfWork.Save();
            return Item;
        }
        public G_USERS Update(G_USERS entity)
        {
            var Item = unitOfWork.Repository<G_USERS>().Update(entity);
            unitOfWork.Save();
            return Item;
        }
        #endregion
    }
}
