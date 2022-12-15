import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const DELETE_PRODUCT_TYPE_MUTATION = gql`
  mutation($input: DeleteProductTypeInput!) {
  	deleteProductType(input: $input) {
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
