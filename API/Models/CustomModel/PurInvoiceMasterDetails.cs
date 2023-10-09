using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class PurInvoiceMasterDetails: SecurityandUpdateFlagClass
    {
            public I_Pur_TR_Receive I_Pur_TR_Receive { get; set; }
            public List<I_Pur_TR_ReceiveItems> I_Pur_TR_ReceiveItems { get; set; }
            public List<I_Pur_Tr_ReceiveCharges> I_Pur_Tr_ReceiveCharges { get; set; }

    }
}