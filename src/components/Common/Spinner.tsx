import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.wrapper}> 
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;