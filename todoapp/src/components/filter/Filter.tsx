import { MouseEvent, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { doneState, timeState, inputState } from "atoms/FilterState";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./Filter.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const filterData = ["All", "Done", "Not Done"];

const Filter = () => {
  const [doneSort, setDoneSort] = useRecoilState(doneState);
  const [timeSort, setTimeSort] = useRecoilState(timeState);
  const [inputSort, setInputSort] = useRecoilState(inputState);

  const handleSortBtnClick = () => {
    setTimeSort((prev) => !prev);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSort(e.target.value);
  };
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setDoneSort((e.target as HTMLButtonElement).value);
  };

  return (
    <div className={styles["filter-wrapper"]}>
      <input
        type="text"
        placeholder="검색"
        value={inputSort}
        onChange={handleSearchChange}
        className={styles["search-input"]}
      />
      <div className={styles["btn-group"]}>
        {filterData.map((value) => (
          <button
            key={value}
            className={cx("btn-white", doneSort === value && "checked")}
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
        <FontAwesomeIcon icon={timeSort ? faArrowDown : faArrowUp} />
      </button>
    </div>
  );
};

export default Filter;
