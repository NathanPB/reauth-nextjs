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

import Axios from "axios";
import ReauthConfig from "../ReauthConfig";
import {NextApiRequest} from "next";

export default (config: ReauthConfig) => async (req: NextApiRequest) => {
  const url = `${config.appBaseUrl}/api/${config.reauthApiBasePath}/identity`
  const headers = {
    Authorization: `Bearer ${req.cookies[config.cookieKey]}`
  }
  try {
    return (await Axios.get(url, { headers })).data
  } catch (e) {
    return null
  }
}
