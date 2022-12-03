import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const GET_PRODUCT_TYPE_LIST_QUERRY = gql`
  query($input: ProductTypesFilterInput, $first: Int, $after: String, $last: Int, $before: String) {
  	productTypes(input: $input, first: $first, after: $after, last: $last, before: $before) {
  		edges {
  			cursor
  		},
  		nodes {
  			id,
  			name,
  			categories {
  				id,
  				name,
  				description,
  				deletedAt
  			},
  			price
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
