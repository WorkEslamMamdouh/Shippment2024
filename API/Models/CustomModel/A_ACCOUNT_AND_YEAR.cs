using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class A_ACCOUNT_AND_YEAR : SecurityandUpdateFlagClass
    {
        public List<A_ACCOUNT> A_ACCOUNT { get; set; }
        public A_ACCOUNT_YEAR A_ACCOUNT_YEAR { get; set; }
    }
}