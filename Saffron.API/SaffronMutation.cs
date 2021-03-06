﻿using GraphQL.Types;
using Saffron.API.Data;
using Saffron.API.Data.Abstractions;
using Saffron.API.Domain;
using Saffron.API.InputTypes;
using Saffron.API.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saffron.API
{
	public class SaffronMutation : ObjectGraphType
	{
		public SaffronMutation(ICookbookRepository cookbookRepo)
		{
			Field<CookbookType>(
				"createCookbook",
				arguments: new QueryArguments(
						new QueryArgument<NonNullGraphType<CookbookInputType>> { Name = "cookbook"}
					),
				resolve: context =>
				{
					var cookbook = context.GetArgument<Cookbook>("cookbook");
					return cookbookRepo.CreateCookbook(cookbook);
				});
		}
	}
}
