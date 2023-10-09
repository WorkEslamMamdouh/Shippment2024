using Inv.DAL.Domain;

namespace Inv.BLL.Services.ACCOUNT_GROUP
{
    public interface IACCOUNT_GROUPService
    {
        A_ACCOUNT_GROUP GetById(int id); 
        A_ACCOUNT_GROUP InsertMaster(A_ACCOUNT_GROUP entity);
        A_ACCOUNT_GROUP UpdateMaster(A_ACCOUNT_GROUP entity);
        A_ACCOUNT_GROUP_DETAIL InsertDetail(A_ACCOUNT_GROUP_DETAIL entity);
        A_ACCOUNT_GROUP_DETAIL UpdateDetail(A_ACCOUNT_GROUP_DETAIL entity);
        void DeleteDetail(int id);

    }
}
