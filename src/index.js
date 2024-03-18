import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./common/redux/store";
import { handleLoader } from "./common/redux/action";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyledEngineProvider } from "@mui/material/styles";
import "./i18n"

const queryClient = new QueryClient();

const { dispatch } = store;
let requestCount = 0;

axios.interceptors.request.use(
	(config) => {
		let checkArr = [
			"getAllCronJobByProfile",
			"manualListCampaignsFromAmazon",
			"manualGenerateReport",
			"manualListAdGroupsFromAmazon",
			"manualGenerateReport",
			"manualListKeywordsFromAmazon",
			"manualListProductAdsFromAmazon",
			"manualListProductsFromAmazon",
			"changeStatusByProfile",
		];
		let configArr = config.url.split("/");
		let find = checkArr.some((x) => configArr.includes(x));

		if (!find) {
			requestCount++;
			dispatch(handleLoader(true));
		}

		return config;
	},
	(error) => {
		
		requestCount--;
		if (requestCount === 0) {
			dispatch(handleLoader(false));
		}
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		
		requestCount--;

		if (requestCount === 0) {
			dispatch(handleLoader(false));
		}

		if (
			response.data.isSuccess === false &&
			response.data.message === "Invalid token"
		) {
			localStorage.removeItem("sellerToken");
			window.location.href = "/login";
		} else if (
			response.data.isSuccess === false &&
			response.data.message === "Token Expired"
		) {
			localStorage.removeItem("sellerToken");
			window.location.href = "/login";
		} else {
			return response;
		}
	},
	(error) => {
		
		requestCount--;
		if (requestCount === 0) {
			dispatch(handleLoader(false));
		}

		if (error.response) {
			return Promise.reject(error);
		} else if (error.request) {
			return Promise.reject(error);
		} else {
			return Promise.reject(error);
		}
	}
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<StyledEngineProvider injectFirst>
				<App />
			</StyledEngineProvider>
		</Provider>
	</QueryClientProvider>
);

reportWebVitals();
