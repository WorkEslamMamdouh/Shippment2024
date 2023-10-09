using Inv.API.Tools;
using System.Web.Http;

namespace Inv.API.Controllers
{
    public class DatabaseChangeController : ApiController
    {
        

        [HttpGet]
        public void SetSelectedYear(string year)
        {
            Shared.Session.SelectedYear = year;
                        
        }
    }
}
