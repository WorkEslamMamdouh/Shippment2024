using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inv.DAL.Domain;
using Inv.API.Models;

namespace Inv.API.Models.CustomModel
{
    public class ModelUserMasterDetail : SecurityandUpdateFlagClass
    {
        public G_USERS G_USERS { get; set; }
        public List<G_USER_BRANCH> G_USER_BRANCH { get; set; }
        public List<G_RoleUsers> G_RoleUsers { get; set; }
    }
}