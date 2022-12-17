import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const UPDATE_CATEGORY = gql`
  mutation($input: UpdateCategoryInput) {
  	updateCategory(input: $input) {
  		categories {
  			id,
  			name,
  			description,
  			deletedAt
  		}
  	}
  }
`;
