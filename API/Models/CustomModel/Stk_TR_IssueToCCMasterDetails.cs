using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class Stk_TR_IssueToCCMasterDetails : SecurityandUpdateFlagClass
    {
        public I_Stk_TR_IssueToCC I_Stk_TR_IssueToCC { get; set; }
        public List<I_Stk_TR_IssueToCCDetails> I_Stk_TR_IssueToCCDetails { get; set; }
    }
}