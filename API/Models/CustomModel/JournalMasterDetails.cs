using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class JournalMasterDetails : SecurityandUpdateFlagClass
    {
        public A_JOURNAL_HEADER A_JOURNAL_HEADER { get; set; }
        public List<A_JOURNAL_DETAIL> A_JOURNAL_DETAIL { get; set; }
    }
}