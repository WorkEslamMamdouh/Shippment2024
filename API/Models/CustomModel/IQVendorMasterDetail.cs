using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class IQVendorMasterDetail : SecurityandUpdateFlagClass
    {
        public List<IQ_GetVendor >IQ_GetVendor { get; set; }
        public List<AQ_GetVendorDoc> AQ_GetVendorDoc { get; set; }
    }
}