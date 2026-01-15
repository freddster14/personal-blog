import { isRouteErrorResponse, useRouteError, Link } from "react-router";
import Nav from "../components/Navbar";

export default function RootErrorBoundary() {
  let error = useRouteError();
  console.log(error)
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Nav />
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}, return <Link to="/">Home</Link></p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}