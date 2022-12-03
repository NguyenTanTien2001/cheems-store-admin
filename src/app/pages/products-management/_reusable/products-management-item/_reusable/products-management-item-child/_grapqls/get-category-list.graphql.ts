import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const GET_CATEGORY_LIST = gql`
  query($input: CategoriesFilterInput, $first: Int, $after: String, $last: Int, $before: String) {
  	categories(input: $input, first: $first, after: $after, last: $last, before: $before) {
  		edges {
  			cursor,
  			node {
  				id,
  				name,
  				description,
  				deletedAt
  			}
  		},
  		nodes {
  			id,
  			name,
  			description,
  			deletedAt
  		},
  		pageInfo {
  			endCursor,
  			hasNextPage,
  			hasPreviousPage,
  			startCursor
  		},
  		totalCount
  	}
  }
`;
