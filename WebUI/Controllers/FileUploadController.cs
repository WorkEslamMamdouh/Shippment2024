 
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System;
using System.IO;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Linq;

public class FileUploadController : Controller
{


    //protected InvEntities db = UnitOfWork.context(BuildConnectionString());

    //public static string BuildConnectionString()
    //{
    //    HttpClient httpClient = new HttpClient();
    //    string res = httpClient.GetStringAsync(WebConfigurationManager.AppSettings["ServiceUrl"] + "SystemTools/BuildConnectionReportsForm").Result;
    //    return res;
    //}

    //public static string BuildConnectionString()
    //{
    //    try
    //    {

    //        SqlConnectionStringBuilder sqlBuilder = new SqlConnectionStringBuilder();
    //        EntityConnectionStringBuilder entityBuilder = new EntityConnectionStringBuilder();

    //        // Set the properties for the data source.
    //        sqlBuilder.DataSource = WebConfigurationManager.AppSettings["ServerNameReportsForm"];
    //        bool singleDb = Convert.ToBoolean(WebConfigurationManager.AppSettings["singleDb"]);

    //        if (singleDb == false)
    //            sqlBuilder.InitialCatalog = WebConfigurationManager.AppSettings["AbsoluteSysDbNameReportsForm"];
    //        else
    //            sqlBuilder.InitialCatalog = WebConfigurationManager.AppSettings["AbsoluteSysDbNameReportsForm"];

    //        sqlBuilder.UserID = WebConfigurationManager.AppSettings["DbUserNameReportsForm"];
    //        sqlBuilder.Password = WebConfigurationManager.AppSettings["DbPasswordReportsForm"];
    //        sqlBuilder.IntegratedSecurity = Convert.ToBoolean(WebConfigurationManager.AppSettings["UseIntegratedSecurity"]);
    //        sqlBuilder.MultipleActiveResultSets = true;

    //        string providerString = sqlBuilder.ToString();

    //        entityBuilder.ProviderConnectionString = "Persist Security Info=True;" + providerString;
    //        entityBuilder.Provider = "System.Data.SqlClient";
    //        entityBuilder.Metadata = @"res://*/Domain.InvModel.csdl|res://*/Domain.InvModel.ssdl|res://*/Domain.InvModel.msl";

    //        return entityBuilder.ConnectionString;
    //    }
    //    catch (Exception ex)
    //    {

    //    }
    //    return "";
    //}


    //[HttpGet]
    //public string GetUrlPathSaveFile(int CompCode, string FormCode)
    //{
        
          
    //        var G_Excel =  db.G_ExcelLoader.Where(x => x.CompCode == CompCode && x.FormCode == FormCode).FirstOrDefault();

    //    string Path = "" + G_Excel.TemplateExcelFolder + "=";
    //      Path = Path+ "" + G_Excel.UploadExcelFolder + "";

    //    return Path; // Redirect to another page after successful upload
    //}

    [HttpPost]
    public ActionResult Upload(HttpPostedFileBase fileUpload , string Path_Url , string fileName)
    {
        if (fileUpload != null && fileUpload.ContentLength > 0)
        {
            //string fileName = Path.GetFileName(fileUpload.FileName);
            //string serverPath = Server.MapPath("/FileUpload/"); // Specify the server location to save the file
            //string serverPath =   System.Web.HttpContext.Current.Server.UrlPathEncode(@"/SavePath/Dropbox/FileUpload/");
             
            string serverPath =  System.Web.HttpContext.Current.Server.UrlPathEncode(@"" + Path_Url + "");

            // Create the directory if it doesn't exist
            Directory.CreateDirectory(serverPath);

            string filePath = Path.Combine(serverPath, fileName);
            fileUpload.SaveAs(filePath);
        }

        return RedirectToAction("Index", "Home"); // Redirect to another page after successful upload
    }
     

}
