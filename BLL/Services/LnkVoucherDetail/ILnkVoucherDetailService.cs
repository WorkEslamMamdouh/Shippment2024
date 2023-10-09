using Inv.DAL.Domain;

namespace Inv.BLL.Services.LnkVoucherDetail
{
    public interface ILnkVoucherDetailService
    {
        A_LnkVoucher Insert(A_LnkVoucher entity);
        A_LnkVoucher Update(A_LnkVoucher entity);
        void Delete(long id);
    }
}
