import React from 'react';
import {getAccessToken, UserProvider} from '@auth0/nextjs-auth0';
import GraphQLProvider from "../components/GraphQLProvider";
import {createTheme, ThemeProvider} from "@mui/system";
import {purple} from "@mui/material/colors";

const theme = createTheme({
	palette: {
		primary: {
			main: purple[500],
		},
		secondary: {
			main: '#f44336',
		},
	},
});

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<GraphQLProvider>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</GraphQLProvider>
		</UserProvider>
	);
}
