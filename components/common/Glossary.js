import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/modal/Modal'

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Glossary = ({glossary}) => (
    <Modal target='glossary' text={glossary.title} title={glossary.title}>
        {documentToReactComponents(glossary.content.json)}
    </Modal>
)

Glossary.propTypes = PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
});

export default Glossary
