using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Api.Controllers
{
    public class ValuesController : BaseController
    {
        [HttpPost("save-profile")]
        public async Task<IActionResult> SaveProfile()
        {
            return Ok();
        }
    }
}
