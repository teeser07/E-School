using App.Data.DTOs;
using App.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace App.Api.Extensions
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger, RequestDelegate next)
        {
            this.next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error middleware");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            string message = string.Empty;
            switch (exception)
            {
                case ApiException api:
                    context.Response.StatusCode = (int)api.Code;
                    message = api.Message;
                    break;
                case Exception ex:
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    message = ex.Message;
                    break;
            }

            
            await context.Response.WriteAsync(JsonConvert.SerializeObject(new
            {
                message = message
            }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }));
        }
    }
}
