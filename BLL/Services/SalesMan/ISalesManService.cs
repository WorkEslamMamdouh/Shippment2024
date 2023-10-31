using Inv.DAL.Domain; 

namespace Inv.BLL.Services.SalesMan
{
    public interface ISalesManService
    {
        I_Sls_D_Salesman Insert(I_Sls_D_Salesman entity);
        I_Sls_D_Salesman Update(I_Sls_D_Salesman entity);
         
    }
}
