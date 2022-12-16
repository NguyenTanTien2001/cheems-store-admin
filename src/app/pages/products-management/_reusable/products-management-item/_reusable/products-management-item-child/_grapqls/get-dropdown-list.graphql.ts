import { gql } from "apollo-angular";

export const GET_DROPDOWN_LIST = gql`
query {
	manufacturers {
		nodes {
			id,
			name,
			description,
			address
		},
	},
	categories {
		nodes {
			id,
			name,
			description,
			deletedAt
		},
	}
}
`;
