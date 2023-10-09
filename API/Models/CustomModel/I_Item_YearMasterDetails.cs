using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class I_Item_YearMasterDetails : SecurityandUpdateFlagClass
    {
        public List<I_Item> I_Item { get; set; }
        public List<I_ItemYear> I_ItemYear { get; set; }
    }
}