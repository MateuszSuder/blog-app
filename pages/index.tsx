import {usePostsQuery} from "../requests/ts/types";
import {gql, useQuery} from "@apollo/client";

const IndexPage = () => {
  const { data, error, loading } = usePostsQuery();
  if(data) {
    console.log(data.post);
  }
  return <></>
}

export default IndexPage