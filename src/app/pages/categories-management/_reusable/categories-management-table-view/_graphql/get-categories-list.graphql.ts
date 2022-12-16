import { gql } from "apollo-angular";

export const GET_CATEGORIES_LIST_QUERRY = gql`
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
