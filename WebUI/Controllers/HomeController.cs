using Newtonsoft.Json;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{

    //[RequireHttps]K
    public class HomeController : Controller
    {



        public class AllPages
        {
            public string ModuleCode { get; set; }
            public string Page_Html { get; set; }
        }




        #region Open Pages 


        string[] AllPath_Url = {

         "~/Views/Profile/ProfileIndex.cshtml", 
         "~/Views/Login/LoginIndex.cshtml",
         "~/Views/Home/HomeIndex.cshtml",
         "~/Views/Saller/Order_SallerIndex.cshtml",
         "~/Views/Saller/View_Seller_OrdersIndex.cshtml",
         "~/Views/Saller/Seller_Order_finishIndex.cshtml",
         "~/Views/Delivery/View_delivery_OrdersIndex.cshtml",
         "~/Views/GeneralHub/View_Validate_OrdersIndex.cshtml",
         "~/Views/Order/View_OrderIndex.cshtml",
         "~/Views/Order/Edit_OrderIndex.cshtml",
         "~/Views/Zone/ZoneIndex.cshtml",
         "~/Views/Zone/FamilyZonesIndex.cshtml",
         "~/Views/UserDef/UserDefIndex.cshtml",
         "~/Views/PromoCode/PromoCodeIndex.cshtml",
         "~/Views/GeneralHub/RecieptOrdersIndex.cshtml",
         "~/Views/GeneralHub/CashCollectIndex.cshtml",
         "~/Views/GeneralHub/Merchant_PaymentIndex.cshtml",
         "~/Views/GeneralHub/Coding_ItemsIndex.cshtml",
         "~/Views/Delivery/WalletIndex.cshtml",
         "~/Views/GeneralHub/ShipOrderIndex.cshtml", 
         "~/Views/Store/StoreIndex.cshtml", 
         "~/Views/UserControl/VendorControlIndex.cshtml",
         "~/Views/UserControl/EmpControlIndex.cshtml",
         "~/Views/UserControl/Seller_ControlIndex.cshtml",
         "~/Views/GeneralHub/View_Deleted_OrdersIndex.cshtml", 
         "~/Views/UserControl/EmpControlIndex.cshtml",
         "~/Views/GeneralHub/Return_ItemsIndex.cshtml",
         "~/Views/Vouchers/VoucherPaymentIndex.cshtml",
         "~/Views/Vouchers/VoucherReceiptIndex.cshtml",
         "~/Views/Order/Print_OrderIndex.cshtml",
         "~/Views/GeneralHub/Chase_DeliveryIndex.cshtml",
         "~/Views/GeneralHub/Items_In_StoresIndex.cshtml",
         "~/Views/GeneralHub/History_OrderIndex.cshtml",
         "~/Views/GeneralHub/MoneyIndex.cshtml",
         "~/Views/Saller/Seller_ReturnIndex.cshtml",
         "~/Views/Saller/Seller_Coll_InvIndex.cshtml",
         "~/Views/Saller/Seller_Wait_InvIndex.cshtml", 

                      };

        #endregion  Open Pages 

        [HttpGet]
        public string GetAllView()
        {


            List<AllPages> AllHtmlPages = new List<AllPages>();

            for (int i = 0; i < AllPath_Url.Length; i++)
            {
                ContentResult PageContent = new ContentResult();
                AllPages OnePage = new AllPages();

                // Render the view to HTML
                string htmlContent = ViewToString(AllPath_Url[i]);
                PageContent = Content(htmlContent, "text/html");

                OnePage.Page_Html = PageContent.Content.ToString();

                var parts = AllPath_Url[i].Split('/');

                string ModuleCode = parts[parts.Length - 1].ToString();
                ModuleCode = ModuleCode.Replace(".cshtml", "");
                ModuleCode = ModuleCode.Replace(".csHtml", "");
                ModuleCode = ModuleCode.Replace(".csHTML", "");
                ModuleCode = ModuleCode.Replace(".CSHTML", "");
                ModuleCode = ModuleCode.Replace("Index", "");
                ModuleCode = ModuleCode.Replace("index", "");
                ModuleCode = ModuleCode.Replace("INDEX", "");

                OnePage.ModuleCode = ModuleCode;

                AllHtmlPages.Add(OnePage);

            }

            string jsonData = JsonConvert.SerializeObject(AllHtmlPages, Formatting.Indented);


            return jsonData;
        }


        public ActionResult OpenView(string moduleCode)
        {
            string viewPath = "";

            var method = this.GetType().GetMethod(moduleCode + "Index");
            if (method != null)
            {
                object result = method.Invoke(this, null);

                if (result != null && result is string)
                {
                    // Check if the result is a string
                    viewPath = (string)result;

                    // Render the view to HTML
                    string htmlContent = ViewToString(viewPath);

                    return Content(htmlContent, "text/html");
                }

            }

            return Content("", "text/html");
        }

        private string ViewToString(string viewPath)
        {

            using (StringWriter sw = new StringWriter())
            {
                ViewEngineResult viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewPath);
                ViewContext viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);

                return sw.ToString();
            }
        }


        //    GET: Home
        public ActionResult ContainerIndex()
        {

            //Session["ErrorUrl"] = "";//Url.Action("LoginIndex", "Login");
            //SessionManager.SessionRecord.CompanyNameAr = "";

            //Session["SystemProperties"] = SessionManager.SessionRecord;

            //return View("HomeIndex");
            return View("htmlContainerIndex");
        }
 
       
        public ActionResult Logout()
        {

            //SessionManager.Me = null;
            //SessionManager.ModelCount = 0;
            //SessionManager.PageIndex = 0;
            //SessionManager.SessionRecord = null;

            return RedirectToAction("Loginindex", "Login");
        }

        public ActionResult OpenImg(string path)
        {
            // Combine the path to the file with the root directory of your application
            
            string fullPath = Server.MapPath(path);

            // Check if the file exists before returning it
            if (System.IO.File.Exists(fullPath))
            {
                // Determine the content type based on the file extension
                string contentType = "application/octet-stream"; // Default content type
                if (Path.GetExtension(fullPath) == ".jpg")
                {
                    contentType = "image/jpeg";
                }

                // Return the file using FileContentResult
                byte[] fileBytes = System.IO.File.ReadAllBytes(fullPath);
                return File(fileBytes, contentType);
            }
            else
            {
                // If the file doesn't exist, return an error or handle it accordingly
                return HttpNotFound("File not found");
            }
        }


    }
}