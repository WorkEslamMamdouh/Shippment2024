using Inv.WebUI.Filter;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{
    [AuthorizeUserAttribute()]
    public class MessageController : Controller
    {
      
        public ActionResult MessageIndex()
        {
             return View();
        }

  




    }
}