import {
  BASE_API_URL,
  state,
  getData,
  jobDetailsContentEl,
} from "../common.js";
import renderError from "./Error.js";
import renderJobDetails from "./JobDetails.js";
import renderJobList from "./JobList.js";
import renderSpinner from "./Spinner.js";

const loadHashChangeHandler = async () => {
  // get id from url
  const id = window.location.hash.substring(1);

  if (id) {
    // remove the active class from previously active job items
    document
      .querySelectorAll(".job-item--active")
      .forEach((jobItemWithActiveClass) =>
        jobItemWithActiveClass.classList.remove("job-item--active")
      );

    // remove previous job details content
    jobDetailsContentEl.innerHTML = "";

    // add spinner
    renderSpinner("job-details");

    try {
      // fetch job item data
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      // extract job item
      const { jobItem } = data;

      // update state
      state.activeJobItem = jobItem;

      // render search job list
      renderJobList();

      // remove spinner
      renderSpinner("job-details");

      // render job details
      renderJobDetails(jobItem);
    } catch (err) {
      // network problem or other errors (e.g. trying to parse something not JSON as JSON)
      renderSpinner("job-details");
      renderError(err.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);
