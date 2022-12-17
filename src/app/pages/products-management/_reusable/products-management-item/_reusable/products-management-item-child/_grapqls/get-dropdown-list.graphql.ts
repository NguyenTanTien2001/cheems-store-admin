import { gql } from "apollo-angular";

export const GET_DROPDOWN_LIST = gql`
query($input_M: ManufacturersFilterInput, $input_C: CategoriesFilterInput) {
	manufacturers(input: $input_M) {
		nodes {
			id,
			name,
			description,
			address
		},
	},
	categories(input: $input_C) {
		nodes {
			id,
			name,
			description,
			deletedAt
		},
	}
}
`;
