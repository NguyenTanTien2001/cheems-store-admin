import { gql } from "apollo-angular";

export const GET_MANUFACTURES_LIST_QUERRY = gql`
query($input: ManufacturersFilterInput, $first: Int, $after: String, $last: Int, $before: String) {
	manufacturers(input: $input, first: $first, after: $after, last: $last, before: $before) {
		edges {
			cursor,
			node {
				id,
				name,
				description,
				address,
				medias {
					id,
					filePath,
					fileType,
					fileSize
				}
			}
		},
		nodes {
			id,
			name,
			description,
			address
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
