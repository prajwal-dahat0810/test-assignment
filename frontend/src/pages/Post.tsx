import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { blogs } from "./Landing";

export const Post = () => {
  let { id } = useParams();
  console.log(id);


  
  return (
    <div
      style={{
        paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FullBlog blog={blogs} />
    </div>
  );
};
