using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class AQ_GetJournalHeaderWithDetail : SecurityandUpdateFlagClass
    {
        public List<AQ_GetJournalHeader> AQ_GetJournalHeader { get; set; }
        public List<AQ_GetJournalDetail> AQ_GetJournalDetail { get; set; }
    }
}