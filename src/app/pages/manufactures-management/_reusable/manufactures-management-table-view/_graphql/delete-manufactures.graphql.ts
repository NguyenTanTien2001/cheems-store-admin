import { gql } from "apollo-angular";

export const DELETE_MANUFACTURE_MUTATION = gql`
mutation($input: DeleteManufacturerInput!) {
	deleteManufacturer(input: $input) {
		manufacturers {
			id,
			name,
			description
		}
	}
}
`;
