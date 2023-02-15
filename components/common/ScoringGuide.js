import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal/Modal'
import ScoreLabelNew from './ScoreLabelNew'
import { CATEGORY_SCORE_LABELS, OVERALL_SCORE_LABELS } from '../../constants/labels'

const ScoringGuide = ({scores}) => (
    <Modal target='scoring-guide' text='Scoring guide' title='Scoring guide'>
        <div className='container-fluid'>
            <div className='row'>
                <h4 className='guide-heading'>Overall State Score</h4>
                <div className='overall scoring-guide'>
                    {scores
                        .filter(score => score.scoreType === "State")
                        .sort((a, b) => b.value - a.value)
                        .map((score) => <ScoreDescription key={score.value} score={score} />)}
                </div>
                <h4 className='guide-heading'>Policy Category Scores</h4>
                <div className='category scoring-guide'>
                {scores
                        .filter(score => score.scoreType === "Policy")
                        .sort((a, b) => b.value - a.value)
                        .map((score) => <ScoreDescription key={score.value} score={score} />)}
                </div>
                <h4 className='guide-heading'>Checklist Legend</h4>
                <div className='checklist-item small mb-2'>
                    <img src='/images/criteria-met.png' className='checklistIcon' alt='Criteria Met' />
                    This state’s policy includes this characteristic
                </div>
                <div className='checklist-item small mb-2'>
                    <img src='/images/criteria-not-met.png' className='checklistIcon' alt='Criteria Not Met' />
                    This state’s policy does not include this characteristic
                </div>
                <div className='checklist-item small mb-2'>
                    <img src='/images/criteria-maybe-met.png' className='checklistIcon' alt='Criteria Maybe Met' />
                    It is unclear whether this state’s policy includes this characteristic
                </div>
                <div className='checklist-item small mb-2'>
                    <img src='/images/honorable-mention.png' className='checklistIcon' alt='Honorable Mention' />
                    Honorable Mention: A promising policy that doesn’t quite fit
                </div>
                <div className='checklist-item small mb-2'>
                    <img src='/images/innovative-idea.png' className='checklistIcon' alt='Innovative Idea' />
                    Innovative Idea: This state is thinking outside the box on policy solutions
                </div>
            </div>
        </div>
    </Modal>
)

ScoringGuide.propTypes = {
    scores: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            scoreType: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ).isRequired
}

const ScoreDescription = ({ score }) => (
    <div className='score-description mt-2 mb-4'>
        <div className='mb-2'>
            <ScoreLabelNew score={score} />
        </div>
        <p className='small mt-3'>{score.description}</p>
    </div>
)

ScoreDescription.propTypes = {
    score: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        scoreType: PropTypes.string,
        value: PropTypes.number
    })
}

export default ScoringGuide
