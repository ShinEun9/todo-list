import { ReactNode } from "react";
import styles from "./BasicLayout.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: ReactNode;
  headerTitle: string;
};
const BasicLayout = ({ children, headerTitle }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{headerTitle}</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>FESP 1기 Javascript Project</p>
      </footer>

      {headerTitle === "TodoList 상세 페이지" && (
        <button className={styles["btn-back"]} onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
    </div>
  );
};

export default BasicLayout;
