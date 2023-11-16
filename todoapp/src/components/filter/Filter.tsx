import { useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./Filter.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const filterData = ["ALL", "Done", "Not Done"];

const Filter = () => {
  const [filter, setFilter] = useState("ALL");
  const [timeSort, setTimeSort] = useState(false);
  const handleSortBtnClick = () => {
    setTimeSort((prev) => !prev);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFilter((e.target as HTMLButtonElement).value);
  };

  return (
    <div className={styles["search-wrapper"]}>
      <input
        type="text"
        placeholder="검색"
        className={styles["search-input"]}
      />
      <div className={styles["btn-group"]}>
        {filterData.map((value) => (
          <button
            className={cx("btn-white", filter === value && "checked")}
            type="button"
            onClick={handleClick}
            value={value}
          >
            {value}
          </button>
        ))}
      </div>

      <button onClick={handleSortBtnClick} className={styles["btn-sort"]}>
        <span>시간순</span>
        {timeSort ? (
          <FontAwesomeIcon icon={faArrowUp} />
        ) : (
          <FontAwesomeIcon icon={faArrowDown} />
        )}
      </button>
    </div>
  );
};

export default Filter;
