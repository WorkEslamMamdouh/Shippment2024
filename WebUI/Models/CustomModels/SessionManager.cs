﻿//using Inv.WebUI.Models.CustomModels;
using System.Web;

namespace Inv.WebUI.Models
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

            //get { return (SessionRecord)HttpContext.Current.Items["SessionRecord"]; }
            //set { HttpContext.Current.Items["SessionRecord"] = value; }
        }
        
    }
}