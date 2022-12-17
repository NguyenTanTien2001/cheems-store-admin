import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const CREATE_MANUFACTURE = gql`
mutation($input: CreateManufacturerInput) {
	createManufacturer(input: $input) {
		manufacturers {
			id,
			name,
			description,
		}
	}
}
`;
