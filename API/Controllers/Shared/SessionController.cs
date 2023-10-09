using Inv.API.Models;
using System.Web.Http;
using static Inv.API.Models.CustomEntities.IdRequest;

namespace Inv.API.Controllers
{


    public class SessionController : ApiController
    {




        [HttpGet, AllowAnonymous]
        public IHttpActionResult SetSessionRecordValue(string propertyName, string value)
        {
            if (propertyName != null)
            {
                //PropertyInfo property = typeof(SessionRecord).GetProperty(propertyName);
                ////HttpContext.Current.Session["SessionRecord"] = value;
                //SessionRecord myObject = new SessionRecord();
                //property.SetValue(myObject, value);

                Config.Application["" + propertyName + ""] = "" + value + "";

                //string ipAddress = "";
                //if (Dns.GetHostAddresses(Dns.GetHostName()).Length > 0)
                //{
                //    ipAddress = Dns.GetHostAddresses(Dns.GetHostName())[0].ToString() + Dns.GetHostAddresses(Dns.GetHostName())[1].ToString() + Dns.GetHostAddresses(Dns.GetHostName())[2].ToString();
                //    string ee = Dns.GetHostAddresses(Dns.GetHostName())[4].ToString();
                //}


                //System.Web.HttpContext context = System.Web.HttpContext.Current;
                //string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            }




            return Ok(new BaseResponse(100));


        }
        

    }
}