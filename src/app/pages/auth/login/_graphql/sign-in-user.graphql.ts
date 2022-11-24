import { gql } from "apollo-angular";
import { User } from "src/app/data/models/user.model";

export const SIGNIN_USER_QUERRY = gql`
  query ($item: UserAuthenticationInput!) {
    login(input: $item)
  }
`;


export interface SignInUserMutationResponse {
  loading: boolean;
  signinUser: {
    token: string,
    user?: User
  };
}
