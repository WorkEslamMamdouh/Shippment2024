using Inv.DAL.Domain; 

namespace Inv.BLL.Services.Seller
{
    public interface ISellerService
    {
        A_Pay_D_Vendor Insert(A_Pay_D_Vendor entity);
        A_Pay_D_Vendor Update(A_Pay_D_Vendor entity);
        G_USERS Insert(G_USERS entity); 
        G_USERS Update(G_USERS entity); 

    }
}
