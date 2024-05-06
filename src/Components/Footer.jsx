import style from './Footer.module.css';
function Footer() {
  return (
    <footer className={style.footer}>
      &copy; {new Date().getFullYear()}{' '}
      <span className={style.copyright}>of worldWise Inc</span>
    </footer>
  );
}

export default Footer;
