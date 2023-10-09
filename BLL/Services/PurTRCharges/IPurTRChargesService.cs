using Inv.DAL.Domain;
using System.Collections.Generic;

namespace Inv.BLL.Services.PurTRCharges
{
    public  interface IPurTRChargesService
    {
        void InsertLst(List<I_Pur_Tr_ReceiveCharges> obj);
        I_Pur_Tr_ReceiveCharges Insert(I_Pur_Tr_ReceiveCharges entity);
        I_Pur_Tr_ReceiveCharges Update(I_Pur_Tr_ReceiveCharges entity);
        void Delete(int id);
    }
}
