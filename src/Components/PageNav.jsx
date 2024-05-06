import { Link, NavLink } from 'react-router-dom';
import style from './PageNav.module.css';
import Logo from './Logo';

function PageNav() {
  return (
    <div className={style.nav}>
      <Logo />
      <ul>
        <li>
          <Link to={'/product'}>Product</Link>
        </li>
        <li>
          <Link to={'/pricing'}>Pricing</Link>
        </li>
        <li>
          <Link to={'/login'} className={style.ctaLink}>
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
