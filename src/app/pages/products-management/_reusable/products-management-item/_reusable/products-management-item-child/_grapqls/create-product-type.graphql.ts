import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const CREATE_PRODUCT_TYPE = gql`
  mutation($input: CreateProductTypeInput, $files: [Upload!]) {
  	createProductType(input: $input, files: $files) {
  		productTypes {
  			id,
  			name,
  			description,
  			categories {
  				id,
  				name,
  				description,
  				deletedAt
  			},
  			metaData,
  			price,
  			warrentyDate,
  			deletedAt
  		}
  	}
  }
`;
