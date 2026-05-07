import { Link } from 'react-router';
import styles from '~/styles/policies.css?url';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Policies() {
  const websitePolicies = [
    { title: 'Lifetime Ring Warranty', handle: '/warranty' },
    { title: 'Free Resizing', handle: '/free-resizing' },
    { title: 'Shipping Information', handle: '/shipping' },
    { title: 'Finance Options', handle: '/finance-options' },
    { title: 'Privacy Policy', handle: '/policies/privacy-policy' },
    { title: 'Terms of Service', handle: '/policies/terms-of-service' },
    { title: 'Refund Policy', handle: '/policies/refund-policy' }
  ];

  return (
    <div className="policies page-width">
      <h1 className="section-title">Our Policies</h1>
      <p className="sb-description policies-intro-text">
        We believe in transparency and providing you with the best possible experience. Below you can find all our website-related policies and service terms.
      </p>
      <div>
        {websitePolicies.map((policy, index) => (
          <fieldset key={index}>
            <Link to={policy.handle}>{policy.title}</Link>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
