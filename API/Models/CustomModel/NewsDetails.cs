using System.Collections.Generic;
using Inv.DAL.Domain;

namespace Inv.API.Models.CustomModel
{
    public class NewsDetails : SecurityandUpdateFlagClass
    { 
        public List<G_News> G_News { get; set; }
        public List<G_Codes> G_Codes { get; set; }
 
    }
}