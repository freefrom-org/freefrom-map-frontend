import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

import SharedLayout from "components/SharedLayout";
import Breadcrumbs from "components/common/Breadcrumbs";
import ReportMissingInfo from "components/common/ReportMissingInfo";
import ScoringGuide from "components/common/ScoringGuide";
import ShareButtons from "components/common/ShareButtons";
import StateUpdates from "components/common/StateUpdates";
import TakeAction from "components/common/TakeAction";
import Glossary from "components/common/Glossary";
import ModalButton from "components/modal/ModalButton";
import Scorecard from "components/Scorecard";
import { toSlug } from "utils";
import {
  getScores,
  getGlossary,
  getCategories,
  getStateDetails,
  getStateNames,
} from "lib/contentful-api";

function State({ scores, glossary, categories, stateData }) {
  const router = useRouter();
  const { state } = router.query;
  const { name, quote, grade } = stateData;

  return (
    <SharedLayout title={name}>
      <div className="state-page">
        <Breadcrumbs currentPageTitle={state} />
        <h1>{name} Survivor Financial Security Policy Scorecard</h1>
        <p>How well does {name} support survivorsâ€™ financial security?</p>
        <div className="row">
          <div className="col-12 col-md-4">
            <ReactSVG
              loading="lazy"
              src={`/images/states/${name.replace(" ", "-").toLowerCase()}.svg`}
              desc={`Outline of the state of ${name}`}
              aria-label={`Outline of the state of ${name}`}
              className={`img-fluid mb-3 state-image score-${grade}`}
            />
            <h4 aria-hidden="true" className="mb-0">
              Key
            </h4>
            <img
              alt=""
              aria-hidden="true"
              className="img-fluid my-3"
              src="/images/key.png"
            />
            <div className="mb-3">
              <StateUpdates />
            </div>
            <div className="mb-3">
              <ReportMissingInfo />
            </div>
            <ShareButtons className="mb-5" context="state page" />
          </div>
          <div className="col-12 col-md-8">
            <div className="pr-md-3">
              {quote ? (
                <figure className="d-flex flex-column fw-600 my-4">
                  <div className="d-flex flex-row">
                    <img
                      alt=""
                      src="/images/quote.png"
                      width="59px"
                      height="59px"
                      className="p-0 m-0 mr-3"
                    />
                    <blockquote className="fs-21px">{quote}</blockquote>
                  </div>
                  <div className="d-flex flex-row justify-content-end">
                    <figcaption className="fs-16px text-ff-red text-uppercase">
                      â€” Survivor from {name}
                    </figcaption>
                  </div>
                </figure>
              ) : (
                <span></span>
              )}
              <Scorecard categories={categories} stateData={stateData} />
              <div className="understanding-report">
                <h2 className="mb-0">Understanding this report</h2>
                <ScoringGuide scores={scores} />
                <Glossary glossary={glossary} />
                <ModalButton href="/methodology" text="Full methodology" />
              </div>
            </div>
            <TakeAction />
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}

State.propTypes = {
  scores: PropTypes.array,
  glossary: PropTypes.object,
  categories: PropTypes.array,
  stateData: PropTypes.object,
};

export async function getStaticPaths() {
  const states = await getStateNames();
  return {
    paths: states.map((state) => ({ params: { state: toSlug(state.name) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [scores, glossary, categories, stateData] = await Promise.all([
    getScores(),
    getGlossary(),
    getCategories(),
    getStateDetails({ name: params.state }),
  ]);
  return {
    props: {
      scores,
      glossary,
      categories,
      stateData,
    },
    revalidate: 60, // regenerate the page if it's been more than 1 minute
  };
}

export default State;
