import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const UPDATE_MANUFACTURE = gql`
mutation($input: UpdateManufacturerInput) {
	updateManufacturer(input: $input) {
		manufacturers {
			id,
			name,
			description,
		}
	}
}
`;
