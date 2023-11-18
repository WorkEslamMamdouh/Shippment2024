using Inv.DAL.Domain; 

namespace Inv.BLL.Services.SalesMan
{
    public interface ISalesManService
    {
        I_Sls_D_Salesman Insert(I_Sls_D_Salesman entity);
        I_Sls_D_Salesman Update(I_Sls_D_Salesman entity);
        Zones InsertZone(Zones entity);
        Zones UpdateZone(Zones entity);
        void DeleteZone(int id);
        G_STORE InsertStore(G_STORE entity);
        G_STORE UpdateStore(G_STORE entity);

        Voucher_Receipt InsertVoucher(Voucher_Receipt entity);
        Voucher_Receipt UpdateVoucher(Voucher_Receipt entity);

    }
}
