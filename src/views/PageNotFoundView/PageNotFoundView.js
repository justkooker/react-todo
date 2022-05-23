import styles from './PageNotFoundView.module.css';
const PageNotFoundView = () => {
  return (
    <>
      <div className={styles.sun}></div>
      <div className={styles.container}>
        <div className={styles.title}>404 page not found!</div>
        <div className={styles.titleShaddow}>404 page not found!</div>
      </div>
    </>
  );
};
export default PageNotFoundView;
