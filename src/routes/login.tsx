import { Form, Navigate, redirect, useActionData, useRouteError } from "react-router-dom";
import { createRequest, Client, OperationContext, OperationResult } from "urql";
import { pipe, Source, subscribe, toPromise } from 'wonka';
import { GetUserDocument, TokenAuthDocument } from "../graphql/generated"
import { setUser } from "../storage";


export const action = ({client, setToken}: {client: Client, setToken: Function}) => async ({ request, params }: {request: any, params: any}) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await client.mutation(TokenAuthDocument, {email: email, password: password}).toPromise()
  if (result.data?.tokenAuth?.token && !result.error) {
    const token = result.data.tokenAuth.token

    // This extra complexity is needed to pass the token to the client.
    // Otherwise the client would be dependent on the result of setToken, which is async.
    const result2: OperationResult = await new Promise((resolve) => {
      pipe(client.executeQuery(createRequest(GetUserDocument,{}), { fetchOptions: { headers: { authorization: `JWT ${token}` }}}), 
        subscribe(resolve));
    })
    
    if (result2.data?.user && !result2.error) {
      const user = result2.data.user
      setUser(user)
    } else {
      const message="Unable to login";
      throw new Response(result2.error as any, { status: 401, statusText: message})
    }
  
    setToken(token) // Set it last because it triggers render
    return token;
  } else {
    const message="Unable to login";
    throw new Response(result.error as any, { status: 401, statusText: message})
  }
}

function Login({token}: {token: any}) {
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
  return token ? <Navigate to="/" /> :
  <main className="container">
    <article className="grid">
      <div>
        <h1 style={{padding: 0, margin: 0}}>Sparksync</h1>
        <h3 style={{padding: 0, margin: 0}}>Music Lesson Tracker</h3>
        <h2>Sign in</h2>
        <Form method="post" className="">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" required/>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required/>
          <button id="submit" type="submit">Login</button>
          <label htmlFor="submit" className="error">{errorMessage}</label>
        </Form>
      </div>
      <div style={
        {
          "backgroundImage": "url(sparkler.jpg)",
          "backgroundPosition": "center",
          "backgroundSize": "cover"
        }}>
      </div>
    </article>
  </main>
}

export default Login