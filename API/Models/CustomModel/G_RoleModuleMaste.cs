using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class G_RoleModuleMaste : SecurityandUpdateFlagClass
    {
            public G_Role G_Role { get; set; }
            public List<G_RoleModule> G_RoleModule { get; set; }
 
    }
}