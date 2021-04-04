import Head from 'next/head';
import reauth from "../services/reauth";

export default function Home({ session, identity }) {

  function renderLoggedIn() {
    return (
      <section>
        <a href="/api/auth/logout">Log Out</a>
        <br/>
        <article>
          <h2>Session</h2>
          <code className="code">{JSON.stringify(session)}</code>
        </article>
        <article>
          <h2>Identity</h2>
          <code className="code">{JSON.stringify(identity)}</code>
        </article>
      </section>
    )
  }

  function renderLoggedOut() {
    const id = reauth.config.clientId
    const redirect = `${reauth.config.appBaseUrl}/api/${reauth.config.reauthApiBasePath}/callback`
    return (
      <ul>
        <li>
          <a href={`/api/auth/authorize/google?client_id=${id}&redirect_uri=${redirect}&response_type=code&scope=identity`}>
            Login With Google
          </a>
        </li>
        <li>
          <a href={`/api/auth/authorize/discord?client_id=${id}&redirect_uri=${redirect}&response_type=code&scope=identity`}>
            Login With Discord
          </a>
        </li>
        <li>
          <a href={`/api/auth/authorize/twitch?client_id=${id}&redirect_uri=${redirect}&response_type=code&scope=identity`}>
            Login With Twitch
          </a>
        </li>
      </ul>
    )
  }

  return (
    <div className="container">
      <Head>
        <title>Reauth Example App with Next.JS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        { session ? renderLoggedIn() : renderLoggedOut() }
      </main>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  return {
    props: {
      session: await reauth.session(req),
      identity: await reauth.identity(req)
    }
  }
}
