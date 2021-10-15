import { memo, VFC } from "react";
import { Link } from "react-router-dom";

export const Page404: VFC = memo(() => {
  return (
    <>
      <div style={{ textAlign: "center"}}>
        <h3>Page 404 NOT FOUND</h3>
      </div>
      <div>
        <Link to="/">戻る</Link>
      </div>
    </>
  )
})
