using Inv.WebUI.Models;
using System.Web.Configuration;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{
    //[RequireHttps]
    public class LoginController : Controller
    {


        public ActionResult LoginIndex()
        {
            SessionRecord ses = new SessionRecord();
            ses.CurrentYear = WebConfigurationManager.AppSettings["DefaultYear"];
            ses.ScreenLanguage = WebConfigurationManager.AppSettings["Defaultlanguage"];
            SessionManager.SessionRecord = ses;

            return View();
        }

        public ActionResult ErrorIndex()
        {
            string MassError = HttpContext.Session["MessageError"].ToString(); ;
            SessionRecord ses = new SessionRecord();
            ses.SystemName = MassError;
            SessionManager.SessionRecord = ses;

            Session["MessageError"] = MassError;

            //return Content(MassError, "text/xml");
            return View("~/Views/Login/ErrorIndex.cshtml");
        }

        public ActionResult updatesIndex()
        {
            return View(/*"~/Views/Login/updates.cshtml"*/);
        }
       
        public  ActionResult HomePage()
        {

            SessionRecord ses = new SessionRecord();
            ses.CurrentYear = WebConfigurationManager.AppSettings["DefaultYear"];
            ses.ScreenLanguage = WebConfigurationManager.AppSettings["Defaultlanguage"];
            SessionManager.SessionRecord = ses;
            return View();
        }
        public ActionResult WebSectionIndex()
        {
            return View(/*"~/Views/Login/updates.cshtml"*/);
        }
        

        public JsonResult OnLogged()
        {

            var obj = new
            {
                url = Url.Action("HomeIndex", "Home")

            };
            var result = Shared.JsonObject(obj);
            return result;
        }

       


    }
}