import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import { CUSTOMER_DETAILS_QUERY } from '~/graphql/customer-account/CustomerDetailsQuery';

import accountStyles from '~/styles/account.css?url';

export const links = () => {
  return [
    { rel: 'stylesheet', href: accountStyles }
  ];
};

export function shouldRevalidate() {
  return true;
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  await context.customerAccount.handleAuthStatus();

  const { customerAccount } = context;
  const { data, errors } = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    { customer: data.customer },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  /** @type {LoaderReturnData} */
  const { customer } = useLoaderData();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <h1>{heading}</h1>
        <AccountMenu />
      </div>
      <div className="account-main">
        <Outlet context={{ customer }} />
      </div>
    </div>
  );
}


function AccountMenu() {
  return (
    <nav role="navigation" className="account-nav">
      <NavLink
        to="/account/orders"
        className={({isActive}) => (isActive ? 'active' : '')}
      >
        Orders
      </NavLink>
      <NavLink
        to="/account/profile"
        className={({isActive}) => (isActive ? 'active' : '')}
      >
        Profile
      </NavLink>
      <NavLink
        to="/account/addresses"
        className={({isActive}) => (isActive ? 'active' : '')}
      >
        Addresses
      </NavLink>
      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      <button type="submit">Sign out</button>
    </Form>
  );
}

/** @typedef {import('./+types/account').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
