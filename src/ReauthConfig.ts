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

import { NextApiRequest, NextApiResponse } from 'next'

export default interface ReauthConfig {
  reauthBaseUrl: string
  appBaseUrl: string
  reauthApiBasePath: string

  postLogoutRedirect: string
  postLoginRedirect: string

  onLoginFail?: (req: NextApiRequest, res: NextApiResponse, e: Error) => void
  onLogin?: (req: NextApiRequest, res: NextApiResponse, tokenResponse: object) => void
  onLogout?: (req: NextApiRequest, res: NextApiResponse) => void

  clientId: string
  clientSecret: string

  cookieMaxAge: number
  cookieKey: string

  production: boolean
}
