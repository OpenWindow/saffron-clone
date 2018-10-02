﻿using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saffron.API
{
  public class GraphQLRequest
  {
    public string Query { get; set; }
    public JObject Variables { get; set; }
  }
}
