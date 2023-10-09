using Inv.API.Models;
using Inv.API.Tools;
using Inv.BLL.Services.G_SUB_SYSTEM;
using System.Linq;
using System.Web.Http;


namespace Inv.API.Controllers
{
    public class G_SUB_SYSTEMSController : BaseController
    {
        private readonly IG_SUB_SYSTEMSService G_SUB_SYSTEMSService;
        private readonly G_USERSController UserControl;

        public G_SUB_SYSTEMSController(IG_SUB_SYSTEMSService _IG_SUB_SYSTEMSService, G_USERSController _Control)
        {
            this.G_SUB_SYSTEMSService = _IG_SUB_SYSTEMSService;
            this.UserControl = _Control;
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefAccountList = G_SUB_SYSTEMSService.GetAll( ).ToList();

                return Ok(new BaseResponse(AccDefAccountList));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id, string UserCode, string Token)
        {
            if (ModelState.IsValid && UserControl.CheckUser(Token, UserCode))
            {
                var AccDefAccount = G_SUB_SYSTEMSService.GetById(id);

                return Ok(new BaseResponse(AccDefAccount));
            }
            return BadRequest(ModelState);
        }
 
        

       
        

    }
}
