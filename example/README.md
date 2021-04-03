Example usage of Reauth with the Next.JS wrapper

This example contains:
- ReAuth setup with ``docker-compose``, for demonstration purposes only.
- Set up the ReAuth client route handlers in ``/api/auth``
- ReAuth configuration to login with Google, Twitch and Discord

## ReAuth Configuration

This section of the example project will not be described here because it's out of the ``reauth-nextjs`` scope. For material on this, please referrer to the [ReAuth Repository](https://github.com/NathanPB/reauth).

Just keep in mind that file ``docker-compose.yml`` and files under ``reauth`` are not part of the ``reauth-nextjs`` usage.

## ReAuth Next.JS configuration

### Configuring the Reauth Client

Though it's not required, a global ReAuth instance can be configured in a service file like ``src/services/reauth``. This file can be located everywhere, just put it whenever you want to fit your project patterns.

Its highly recommended using ``process.env`` to set up ``clientId`` and ``clientSecret``.

Wrapping a ReAuth instance in a module like that have certain advantages, such as allowing memoization for common HTTP requests in the authorization cycle.

### Configuring the ReAuth Client Route Handlers

Manual route handlers must be configured at ``pages/api/auth``. ``auth`` can be changed to whatever you configured at the previous step.

- [api/auth/[...path].js](src/pages/api/auth/[...path].js): This file will set up proxies to forward the requests to your ReAuth server with proper headers. This is usually needed to avoid CORS problems.
- [api/auth/callback.js](src/pages/api/auth/callback.js): This file will receive redirects from your ReAuth server whenever an authentication code is acquired. This will attempt to exchange the token and set the browser cookies.
- [api/auth/logout.js](src/pages/api/auth/logout.js): This file will just unset the authentication cookies and redirect the user to a specified path, in order to complete the logout.

### Logging users in and out

To log a user in, redirect it to the ``api/auth/oauth/authorize/%PROVIDER%`` url with the proper query parameters to complete an oAuth 2.0 authorization request.

Example:
```jsx
const id = reauth.config.clientId
const redirect = `${reauth.config.appBaseUrl}/api/${reauth.config.reauthApiBasePath}/callback`
return (
  <ul>
    <li>
      <a href={`/api/auth/authorize/googled?client_id=${id}&redirect_uri=${redirect}&response_type=code&scope=identity`}>
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
```

To log a user out, just redirect it to the url ``api/auth/logout``.

**Note that ``auth`` can change [depending on of what you configured](#reauth-configuration).**
