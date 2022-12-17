import { gql } from "apollo-angular";

export const GET_CATEGORY_BY_ID_QUERRY = gql`
query($input: CategoriesFilterInput) {
	categories(input: $input) {
		nodes {
			id,
			name,
			description,
			deletedAt
		},
	}
}
`;
