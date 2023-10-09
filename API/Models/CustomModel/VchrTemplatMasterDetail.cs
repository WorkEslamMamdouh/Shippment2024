using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class VchrTemplatMasterDetail : SecurityandUpdateFlagClass
    {
        public A_TR_VchrTemplate A_TR_VchrTemplate { get; set; }
        public List<A_TR_VchrTemplateDetail> A_TR_VchrTemplateDetail { get; set; }
    }
}