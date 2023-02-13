import { Form, redirect, useRouteError } from "react-router-dom";
import { Client } from "urql";
import { GetUserDocument, TokenAuthDocument } from "../graphql/generated"
import { setToken, setUser } from "../storage";


export const action = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await client.mutation(TokenAuthDocument, {email: email, password: password}).toPromise()
  if (result.data?.tokenAuth?.token && !result.error) {
    const token = result.data.tokenAuth.token
    setToken(token)

    const result2 = await client.query(GetUserDocument,{}).toPromise()
    if (result2.data?.user && !result2.error) {
      const user = result2.data.user
      setUser(user)
    }

    return redirect(`/`);
  } else {
    const message="Unable to login";
    console.log(message, result.error)
    throw new Response(result.error as any, { status: 401, statusText: message})
  }
}

function Login() {
  const error: any = useRouteError();
  let errorMessage = "";
  if (error) {
    if (error.status == 401) {
      errorMessage = "Invalid email/password combination"
    } else if (error.statusText) {
      errorMessage = error.statusText
    } else {
      errorMessage = "Unable to login"
    }
  }
  return <div>
    <h1 style={{padding: 0, margin: 0}}>Sparksync</h1>
    <h3 style={{padding: 0, margin: 0}}>Music Lesson Tracker</h3>
    <h2>Log in</h2>
    <Form method="post" className="all-block">
      <label htmlFor="email">Email</label>
      <input id="email" name="email"/>
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password"/>
      <button id="submit" type="submit" className="btn">Log in</button>
      <label htmlFor="submit" className="error">{errorMessage}</label>
    </Form>
  </div>
}

export default Login