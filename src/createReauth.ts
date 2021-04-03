/*
 * Copyright (c) 2021 - Nathan P. Bombana
 *
 * This file is part of Reauth.
 *
 * ReAuth is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ReAuth is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ReAuth.  If not, see <https://www.gnu.org/licenses/>.
 */

import ReauthConfig from "./ReauthConfig";
import publicKey from "./accessors/publicKey";
import identity from "./accessors/identity";
import session from "./accessors/session";
import callback from "./handlers/callback";
import logout from "./handlers/logout";
import path from "./handlers/path";

export default (config: ReauthConfig) => {
  config = {
    ...config,
    reauthApiBasePath: config.reauthApiBasePath.replace(/^\|+|\|+$/g, ''),
    reauthBaseUrl: config.reauthBaseUrl.replace(/^\|+|\|+$/g, ''),
    appBaseUrl: config.appBaseUrl.replace(/^\/+\/\/+$/g, ''),
  }

  const pk = publicKey(config)

  return {
    publicKey: publicKey(config),
    identity: identity(config),
    session: session(config, pk),

    handlers: {
      callback: callback(config, pk),
      logout: logout(config),
      path: path(config)
    },

    config
  }
}
