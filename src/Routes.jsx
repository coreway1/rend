// Routes.jsx
import React from 'react';

import {
  useLocation,
  useNavigate,
  useParams,
  Routes, 
  Route
} from "react-router-dom";

import { ClientRouter, RoutePropagator, useNavigationHistory } from '@shopify/app-bridge-react';

import { HomePage } from "./components/HomePage";
import { ProductsCard } from "./components/ProductsCard";





function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    let history = useNavigationHistory();

    return (
      <Component
        {...props}
        router={{ location, navigate, params, history }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function Routess(props) {
  const { history, location } = props.router;

  return (
    <>
      <ClientRouter history={history} />
      <RoutePropagator location={location} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<ProductsCard />} />
        
     
        
      </Routes>
    </>
  );
};

export default withRouter(Routess);