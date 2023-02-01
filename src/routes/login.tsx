import { Form, redirect } from "react-router-dom";
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
  return <div>
    <h1>Sparksync</h1>
    <h3>Music Lesson Tracker</h3>
    <br></br>
    <h2>Log in</h2>
    <Form method="post">
      <label htmlFor="email">Email</label>
      <input id="email" name="email"/>
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password"/>
      <button type="submit">Log in</button>
    </Form>
  </div>
}

export default Login