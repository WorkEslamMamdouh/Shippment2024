using System.Web.Optimization;

namespace Inv.WebUI.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/Bundles/AppScript2")
                  .Include("~/New/vendor/jquery/jquery.min.js",
                  "~/New/vendor/bootstrap/js/bootstrap.bundle.min.js",
                  "~/New/vendor/jquery-easing/jquery.easing.min.js",
                  "~/New/js/sb-admin-2.min.js",
                  "~/Newtemplate/LodBut/Loder.js",
                  "~/js/select2.min.js",
                  "~/Scripts/DataTables/jquery.dataTables.min.js" 
                   ));




            bundles.Add(new ScriptBundle("~/Bundles/AppScript3")
              .Include("~/ClientApp/Entities.js",
                "~/ClientApp/Shared.js",
                "~/ClientApp/App.js",
                "~/ClientApp/JsGrid.js",
                "~/Scripts/jsgrid/jsgrid.js",
                "~/ClientApp/SystemTools.js",
                "~/ClientApp/CustomEntities.js",
                "~/ClientApp/MessageBox.js",
                "~/ClientApp/Layout.js"));





            bundles.Add(new ScriptBundle("~/Bundles/AppScript4")
             .Include("~/ClientApp/DataTable.js",
                "~/js/select2.min.js"));

             
        }
    }
}