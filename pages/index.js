import React from "react";
import PropTypes from "prop-types";

import ReportMissingInfo from "components/common/ReportMissingInfo";
import ShareButtons from "components/common/ShareButtons";
import SharedLayout from "components/SharedLayout";
import Snapshots from "components/Snapshots";
import StateUpdates from "components/common/StateUpdates";
import StatesList from "components/StatesList";
import StateWatchlist from "components/StateWatchlist";
import TakeAction from "components/common/TakeAction";
import UsMap from "components/UsMap";

import styles from "components/common/Common.module.css";
import { getStates } from "lib/contentful-api";

function Home({ allStates, watchlistStates }) {
  const visibleComponent = "list";
  const showList = visibleComponent === "list";
  const mapClass = showList ? " d-none d-md-block" : "";
  const listClass = showList ? "" : " d-none d-md-block";

  return (
    <SharedLayout>
      <h1 className="mt-3">
        The National Survivor Financial Security Policy Map and Scorecard
      </h1>
      <p className="mb-4">
        How well does your state support survivors’ financial security?
      </p>

      <div className="d-flex flex-row flex-fill">
        <div
          className={`col-md-3 p-0${listClass}`}
          style={{ minWidth: "300px" }}
        >
          <StatesList states={allStates} />
        </div>

        <div className={`col-md-9${mapClass}`}>
          <div
            aria-hidden="true"
            className={`mb-4 ml-3 d-md-flex flex-row justify-content-start${mapClass}`}
          >
            <div className="d-flex flex-column">
              <h4 className="mb-1">Key</h4>
              <div className={styles["map-key-container"]}>
                <span
                  className={styles["map-key-item"]}
                  style={{ backgroundColor: "#FFB400" }}
                >
                  Model State
                </span>
                <span
                  className={styles["map-key-item"]}
                  style={{ backgroundColor: "#00CFCE" }}
                >
                  Financial Security Friendly
                </span>
                <span
                  className={styles["map-key-item"]}
                  style={{ backgroundColor: "#AAE5E1" }}
                >
                  Taking Steps
                </span>
                <span
                  className={styles["map-key-item"]}
                  style={{ backgroundColor: "#FF9194" }}
                >
                  Some Accountability
                </span>
                <span
                  className={styles["map-key-item"]}
                  style={{ backgroundColor: "#FF583D" }}
                >
                  Little Accountability
                </span>
              </div>
            </div>
          </div>
          <UsMap states={allStates} />
        </div>
      </div>

      <div className="d-md-flex flex-row justify-content-start mt-4">
        <div
          className="d-flex flex-column flex-md-row"
          style={{ minWidth: "60%" }}
        >
          <div className="pr-3 mb-3">
            <ShareButtons
              className="d-flex flex-row flex-nowrap"
              context="homepage"
            />
          </div>
          <div className="pr-3 mb-3">
            <StateUpdates />
          </div>
          <div className="pr-3">
            <ReportMissingInfo />
          </div>
        </div>
      </div>

      <StateWatchlist states={watchlistStates} />

      <h2 className="mt-5">
        Snapshot of Survivor Financial Security Policies By State
      </h2>
      <Snapshots />

      <h2 className="mt-5">
        Snapshot of Survivor Financial Security Policies By Category
      </h2>
      <div className="d-flex flex-column col-12 col-lg-10 p-0">
        <img
          className="img-fluid"
          src="/images/snapshot-by-category.png"
          alt="snapshot of survivor financial security policies by category"
          loading="lazy"
        />
      </div>
      <TakeAction />
    </SharedLayout>
  );
}

Home.propTypes = {
  allStates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      grade: PropTypes.number,
    })
  ),
  watchlistStates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      watchlistPosition: PropTypes.number,
      watchlistContent: PropTypes.object,
    })
  ),
};

export async function getStaticProps() {
  let allStates = await getStates();
  // Assign rank to states list
  let lastTotal = Infinity;
  let lastRank = 0;

  allStates = allStates
    .sort((a, b) => b.total - a.total)
    .map((state, i) => {
      if (state.total === lastTotal) {
        // If there's a tie, use the previous rank.
        state.rank = lastRank;
      }
      if (state.total < lastTotal) {
        // Get the next ranking (accounting for the gap left by any previous ties).
        const newRank = i + 1 > lastRank ? i + 1 : lastRank + 1;
        // Update the last rank/total and set the state rank value
        state.rank = lastRank = newRank;
        lastTotal = state.total;
      }
      return state;
    });

  let watchlistStates = allStates
    .filter((state) => state.watchlistPosition !== null)
    .sort(
      (stateA, stateB) => stateA.watchlistPosition - stateB.watchlistPosition
    );

  return {
    props: {
      allStates,
      watchlistStates,
    },
    revalidate: 5 * 60, // regenerate the page if it's been more than 5 minutes
  };
}

export default Home;
