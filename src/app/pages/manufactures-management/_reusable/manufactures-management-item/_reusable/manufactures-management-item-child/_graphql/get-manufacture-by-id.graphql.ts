import { gql } from "apollo-angular";

export const GET_MANUFACTURE_BY_ID_QUERRY = gql`
query($input: ManufacturersFilterInput) {
	manufacturers(input: $input) {
		nodes {
			id,
			name,
			description
		},
	}
}
`;
