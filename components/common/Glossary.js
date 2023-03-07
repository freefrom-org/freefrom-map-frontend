import React from 'react'
import PropTypes from 'prop-types'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Modal from 'components/modal/Modal'


const Glossary = ({glossary}) => (
    <Modal target='glossary' text={glossary.title} title={glossary.title}>
        {documentToReactComponents(glossary.content.json)}
    </Modal>
)

Glossary.propTypes = {
    glossary: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.object
    }).isRequired
}

export default Glossary
