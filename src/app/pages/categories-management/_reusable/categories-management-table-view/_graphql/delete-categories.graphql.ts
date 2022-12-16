import { gql } from "apollo-angular";

export const DELETE_CATEGORIES_MUTATION = gql`
mutation($input: DeleteCategoryInput!) {
	deleteCategory(input: $input) {
		categories {
			id
		}
	}
}
`;
