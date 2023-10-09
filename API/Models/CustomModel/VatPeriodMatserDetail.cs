using Inv.DAL.Domain;
using System.Collections.Generic;

namespace Inv.API.Models.CustomModel
{
    public class VatPeriodMatserDetail : SecurityandUpdateFlagClass
    {
        public AVAT_PERIOD AVAT_PERIOD { get; set; }
        public List<AQVAT_GetPeriodDetail> AQVAT_GetPeriodDetailSales { get; set; }
        public List<AQVAT_GetPeriodDetail> AQVAT_GetPeriodDetailPur { get; set; }
        public decimal? vatsales { get; set; }
        public decimal? Updsales { get; set; }
        public decimal? vatPur { get; set; }
        public decimal? UpdPur { get; set; }
    }
}