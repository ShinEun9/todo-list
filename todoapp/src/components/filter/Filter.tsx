import { useState, useEffect, useRef, MouseEvent, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { filterState, timeState, inputState } from "atoms/FilterState";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./Filter.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const filterData = ["All", "Done", "Not Done"];

type Props = {
  sort: () => void;
  getTodo: () => Promise<void>;
};
function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef<number | null>();

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

const Filter = ({ sort, getTodo }: Props) => {
  const [filterSort, setFilterSort] = useRecoilState(filterState);
  const [timeSort, setTimeSort] = useRecoilState(timeState);
  const [searchInput, setSearchInput] = useRecoilState(inputState);
  const debouncedValue = useDebounce(searchInput);

  useEffect(() => {
    (async () => {
      if (!searchInput) {
        await getTodo();
      }
      sort();
    })();
  }, [debouncedValue]);

  const handleSortBtnClick = () => {
    setTimeSort((prev) => !prev);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFilterSort((e.target as HTMLButtonElement).value);
  };

  return (
    <div className={styles["search-wrapper"]}>
      <input
        type="text"
        placeholder="검색"
        value={searchInput}
        onChange={handleSearchChange}
        className={styles["search-input"]}
      />
      <div className={styles["btn-group"]}>
        {filterData.map((value) => (
          <button
            key={value}
            className={cx("btn-white", filterSort === value && "checked")}
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
