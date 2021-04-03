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

import { NextApiRequest, NextApiResponse } from 'next';
import ReauthConfig from "../ReauthConfig";
import Cookies from 'cookies';
import Axios from 'axios';
import jwt from 'jsonwebtoken';

export default (config: ReauthConfig, pk: Promise<String>) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const code = req.query.code

    if (!code) {
      throw new Error('Authorization code not received')
    }

    const { data } = await Axios.post(`${config.appBaseUrl}/api/${config.reauthApiBasePath}/oauth/token`, {
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/${config.reauthApiBasePath}/callback`
    })

    jwt.verify(data.access_token, await pk)

    const cookies = new Cookies(req, res)
    cookies.set(config.cookieKey, data.access_token, {
      maxAge: config.cookieMaxAge,
      sameSite: config.production ? 'strict' : 'lax',
      overwrite: true
    })

    config.onLogin?.call(req, res, data)
    res.redirect(config.postLoginRedirect)
  } catch (e) {
    config.onLoginFail(req, res, e)
  }
}
