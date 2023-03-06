import React from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";

import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const documentOptions = {
  renderNode: {
    [BLOCKS.HEADING_3]: (_, children) => (
      <strong className="state-to-watch-headline mb-3">{children}</strong>
    ),
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="state-to-watch-text mb-1">{children}</p>
    ),
  },
};

function StateWatchlistItem({ state }) {
  return (
    <div
      className="d-flex flex-row flex-wrap flex-md-nowrap mb-4"
      style={{
        backgroundColor: "#fff",
        border: "1px solid #DDDDDD",
        padding: "1.5rem",
      }}
    >
      <div className="mb-2 mb-md-0 mr-md-3">
        <ReactSVG
          loading="lazy"
          src={`/images/states/${state.name.toLowerCase()}.svg`}
          desc={`Outline of the state of ${state.name}`}
          aria-label={`Outline of the state of ${state.name}`}
          className={`state-to-watch-image score-${state.grade}`}
        />
      </div>
      <div>
        {documentToReactComponents(
          state.watchlistContent.json,
          documentOptions
        )}
      </div>
    </div>
  );
}

StateWatchlistItem.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    grade: PropTypes.number,
    watchlistContent: PropTypes.shape({
      json: PropTypes.object,
    }),
  }),
};

function StateWatchlist({ states }) {
  return (
    <>
      <h2 className="mt-5 mt-3">States to Watch</h2>
      {states.map((state) => (
        <StateWatchlistItem state={state} key={state.name} />
      ))}
    </>
  );
}

StateWatchlist.propTypes = {
  states: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      grade: PropTypes.number,
      watchlistContent: PropTypes.shape({
        json: PropTypes.object,
      }),
    })
  ),
};

export default StateWatchlist;
