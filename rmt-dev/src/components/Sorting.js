import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

const clickHandler = (event) => {
  // get clicked button element
  const clickedBtnEl = event.target.closest(".sorting__button");

  // stop function if no clicked button element
  if (!clickedBtnEl) return;

  // update state (reset to page 1)
  state.currentPage = 1;

  // check if intention is recent or relevent sorting
  const recent = clickedBtnEl.className.includes("--recent") ? true : false;

  // sort job items and make sorting button look (in)active
  // how [].sort works: return positive number to sort b higher than a, return negative number to sort a higher than b, return 0 to stay same
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");

    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo; // e.g. if a.daysAgo = 10 and b.daysAgo = 5, then b is more recent. b should be sorted higher than a. return a positive number.
    });
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");

    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore; // e.g. if a.relevanceScore = 94 and b.relevanceScore = 78, then a is more relevant. a should be sorted higher than b. return a negative number.
    });
  }

  // reset pagination buttons
  renderPaginationButtons();

  // render job items in list
  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
