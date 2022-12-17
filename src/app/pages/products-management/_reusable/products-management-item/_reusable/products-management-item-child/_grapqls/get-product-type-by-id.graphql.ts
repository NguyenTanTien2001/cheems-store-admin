import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const GET_PRODUCT_TYPE_BY_ID_QUERRY = gql`
  query($input: ProductTypesFilterInput, $first: Int, $after: String, $last: Int, $before: String) {
  	productTypes(input: $input, first: $first, after: $after, last: $last, before: $before) {
  		nodes {
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
        medias {
          id,
          filePath,
          fileSize,
          fileType
        },
  			price,
  			warrentyDate,
  			deletedAt
  		},
  	}
  }
`;
