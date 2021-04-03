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

import {createProxyMiddleware} from 'http-proxy-middleware';
import ReauthConfig from "../ReauthConfig";

export default (config: ReauthConfig) => {
  const proxy = createProxyMiddleware({
    target: config.reauthBaseUrl,
    changeOrigin: true,
    pathRewrite: { [`^/api/${config.reauthApiBasePath}`]: '' },
    secure: config.production,
    headers: {
      'Reauth-Origin': `${config.appBaseUrl}/api/${config.reauthApiBasePath}`,
    }
  })

  // @ts-ignore
  const resolver = async (req, res) => await proxy(req, res, () => {})
  resolver.config = { api: { externalResolver: true, bodyParser: false } }

  return resolver
}
