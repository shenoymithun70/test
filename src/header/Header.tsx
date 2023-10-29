import styles from "./header.module.scss";
import viteLogo from "/vite.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.brandLogo}>
        <img src={viteLogo} alt="" />
      </div>
    </div>
  );
};

export default Header;
