// @ts-nocheck
// const fetch = require("cross-fetch");
// @ts-ignore
const graphql = require("graphql");
const getIntrospectionQuery = graphql.getIntrospectionQuery;
const buildClientSchema = graphql.buildClientSchema;
const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URI;
const Realm = require("realm-web");

module.exports = async () => {
	const introspectionQuery = getIntrospectionQuery();

	const app = new Realm.App(process.env.NEXT_PUBLIC_APP_ID);
	const credentials = Realm.Credentials.anonymous();

	try {
		const user = await app.logIn(credentials);
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + user.accessToken,
			},
			body: JSON.stringify({ query: introspectionQuery }),
		});

		const data = await response.json();

		return buildClientSchema(data.data);
	} catch (e) {
		console.error(e);
	}
}