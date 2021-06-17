using System;
using System.Net;

namespace App.Utility
{
    public class ApiException : Exception
    {
        public HttpStatusCode Code { get; }
        public override string Message { get; }

        public ApiException(HttpStatusCode code, string message)
        {
            Code = code;
            Message = message;
        }
    }
}
