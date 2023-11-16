import { ReactNode } from "react";
import styles from "./BasicLayout.module.css";

type Props = {
  children: ReactNode;
  headerTitle: string;
};
const BasicLayout = ({ children, headerTitle }: Props) => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{headerTitle}</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>FESP 1기 Javascript Project</p>
      </footer>
    </div>
  );
};

export default BasicLayout;
