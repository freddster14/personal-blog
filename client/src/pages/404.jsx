import { isRouteErrorResponse, useRouteError, Link } from "react-router";
import Nav from "../components/Navbar";

export default function RootErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <>
          <Nav />
          <h1>404</h1>
          <p>Page Not Found, return <Link to="/">Home</Link></p>
        </>
      );
    }

    return (
      <>
        <Nav />
        <h1>{error.status} </h1>
        <p>{error.data}, return <Link to="/">Home</Link></p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <>
        <Nav />
        <h1>{error.status || 'Error'}</h1>
        <p>{error.message}, return <Link to="/">Home</Link></p>
      </>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}