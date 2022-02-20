import {getAccessToken, withApiAuthRequired} from "@auth0/nextjs-auth0";
import * as Realm from "realm-web";

export default withApiAuthRequired(async (req, res) => {
	try {
		const app = new Realm.App({id: process.env.NEXT_PUBLIC_APP_ID});
		const { accessToken } = await getAccessToken(req, res);
		const user = await app.logIn(Realm.Credentials.jwt(accessToken));
		res.status(200).end(user.accessToken);
	} catch(error) {
		console.error(error)
		res.status(error.status || 500).end(error.message)
	}
});