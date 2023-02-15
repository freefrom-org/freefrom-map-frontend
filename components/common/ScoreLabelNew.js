import React from 'react';
import PropTypes from 'prop-types';

const ScoreLabel = ({ score: { scoreType, value, title} }) => {
    switch (scoreType) {
      case "State":
        scoreType = "overall";
        break;
      case "Policy":
        scoreType = "category";
        break;
    }
    return (<div className={`score-label ${scoreType}-${value} text-nowrap`}>{title}</div>)
}

ScoreLabel.propTypes = {
    score: PropTypes.shape({
        title: PropTypes.string.isRequired,
        scoreType: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    })
}

export default ScoreLabel
