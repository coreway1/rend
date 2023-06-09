import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

import MyRouter from './MyRouter';
import {
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import {useMemo} from 'react';
import Link from "./Link";
import Routess from "./Routes";

import style from './style.css';

export default function App() {
  return (
    <PolarisProvider i18n={translations} linkComponent={Link}>
      <BrowserRouter>
      <AppBridgeProvider
        config={{
          apiKey: process.env.SHOPIFY_API_KEY,
          host: new URL(location.href).searchParams.get("host"),
          forceRedirect: true,
        }}
      >
        <MyProvider>
          <Routess />
        </MyProvider>
      </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}

function MyProvider({ children }) {
  const app = useAppBridge();

  const navigate = useNavigate();
  const history = useMemo(
    () => ({replace: (path) => navigate(path, {replace: true})}),
    [navigate],
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}><MyRouter history={history} />{children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
