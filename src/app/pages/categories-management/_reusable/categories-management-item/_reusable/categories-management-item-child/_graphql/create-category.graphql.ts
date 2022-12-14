import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const CREATE_CATEGORY = gql`
  mutation($input: CreateCategoryInput) {
  	createCategory(input: $input) {
  		categories {
  			id,
  			name,
  			description,
  			deletedAt
  		}
  	}
  }
`;
