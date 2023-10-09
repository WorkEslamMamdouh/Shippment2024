using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class LnkVoucherlMasterDetails : SecurityandUpdateFlagClass
    {
        public FilterLnkVoucher FilterLnkVoucher { get; set; }
        public List<A_LnkVoucher> A_LnkVoucher { get; set; }
    }
}