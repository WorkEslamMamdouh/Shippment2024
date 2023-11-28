using Inv.DAL.Domain;
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
        public FamilyZone InsertFamilyZone(FamilyZone entity)
        {
            var Item = unitOfWork.Repository<FamilyZone>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }
        public FamilyZone UpdateFamilyZone(FamilyZone entity)
        {
            var Item = unitOfWork.Repository<FamilyZone>().Update(entity);
            unitOfWork.Save();
            return Item;
        }
        public void DeleteFamilyZone(int id)
        {
            unitOfWork.Repository<FamilyZone>().Delete(id);
            unitOfWork.Save();
        }
        public Zones InsertZone(Zones entity)
        {
            var Item = unitOfWork.Repository<Zones>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }
        public Zones UpdateZone(Zones entity)
        {
            var Item = unitOfWork.Repository<Zones>().Update(entity);
            unitOfWork.Save();
            return Item;
        }
        public void DeleteZone(int id)
        {
            unitOfWork.Repository<Zones>().Delete(id);
            unitOfWork.Save();
        }
         public G_STORE InsertStore(G_STORE entity)
        {
            var Item = unitOfWork.Repository<G_STORE>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }
        public G_STORE UpdateStore(G_STORE entity)
        {
            var Item = unitOfWork.Repository<G_STORE>().Update(entity);
            unitOfWork.Save();
            return Item;
        }  
        public Voucher_Receipt InsertVoucher(Voucher_Receipt entity)
        {
            var Item = unitOfWork.Repository<Voucher_Receipt>().Insert(entity);
            unitOfWork.Save();
            return Item;
        }
        public Voucher_Receipt UpdateVoucher(Voucher_Receipt entity)
        {
            var Item = unitOfWork.Repository<Voucher_Receipt>().Update(entity);
            unitOfWork.Save();
            return Item;
        }
        #endregion
    }
}
