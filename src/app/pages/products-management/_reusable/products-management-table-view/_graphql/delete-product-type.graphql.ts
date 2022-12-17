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
        metaDatas {
          id,
          audio,
          battery,
          camera,
          color,
          cPUSeries,
          dimensions,
          gPUSeries,
          hardDrive,
          manufacturersId
          manufacturers {
            id,
            address,
            description,
            name
          },
          operatingSystem,
          ports,
          publishedDate,
          ram,
          screenResolution,
          seriesName,
          weight,
          wLAN
        },
        price,
        warrentyDate,
        deletedAt
      }
  	}
  }
`;
