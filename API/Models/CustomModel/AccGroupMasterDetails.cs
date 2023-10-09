using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class AccGroupMasterDetails : SecurityandUpdateFlagClass
    {
        public A_ACCOUNT_GROUP A_ACCOUNT_GROUP { get; set; }
        public List<A_ACCOUNT_GROUP_DETAIL> A_ACCOUNT_GROUP_DETAIL { get; set; }
    }
}