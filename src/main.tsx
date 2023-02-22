import React from 'react'
import ReactDOM from 'react-dom/client'
import { createClient, Provider } from 'urql';
import App from './App'
import './App.css'
//import './mvp.css'
import '../node_modules/@picocss/pico/css/pico.min.css'
import { getToken } from './storage'

const client = createClient({
  url: import.meta.env.VITE_API_URL || '/graphql',
  requestPolicy: "network-only",
  fetchOptions: () => {
    const token = getToken()
    return {
      headers: { authorization: token ? `JWT ${token}` : '' }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
)
