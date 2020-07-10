﻿using System;
using System.Globalization;

namespace LuduStack.Domain.Core.Extensions
{
    public static class GuidExtensions
    {
        public static string NoHyphen(this Guid guid)
        {
            return guid.ToString("N");
        }
    }
}