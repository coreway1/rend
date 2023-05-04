// MyRouter.jsx
import React from 'react';
import {useClientRouting} from '@shopify/app-bridge-react';

export default function MyRouter(props) {

  const {history} = props;

  useClientRouting(history);

  return null;
}
