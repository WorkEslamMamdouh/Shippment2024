using System.Web;

namespace Inv.API.Models.CustomModel
{
    public class SessionManager
    {


        public static SessionRecord SessionRecord
        {
            set
            {
                HttpContext.Current.Session["SessionRecord"] = value;
            }
            get
            {
                
                return HttpContext.Current.Session["SessionRecord"] as SessionRecord;
            }
        }

    }
}