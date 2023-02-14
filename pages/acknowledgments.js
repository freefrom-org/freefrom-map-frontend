import React from 'react'
import PropTypes from 'prop-types'

import SharedLayout from 'components/SharedLayout'
import BackButton from 'components/navigation/BackButton'

import { getAcknowledgmentsPage } from 'lib/contentful-api';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const documentOptions = {
    renderNode: {
        [BLOCKS.UL_LIST]: (node, children) => <ul className='no-bullets no-indents'>{children}</ul>
    },
};

export default function Acknowledgments({title, content}) {
    return (
        <SharedLayout title='Acknowledgments'>
            <BackButton className='mt-3 mb-2' />
            <h1 className='subpage-header hyphenate'>{title}</h1>
            {documentToReactComponents(content, documentOptions)}
        </SharedLayout>
    )
}

Acknowledgments.propTypes = {
    title: PropTypes.text,
    content: PropTypes.object
}

export async function getStaticProps() {
    const page = await getAcknowledgmentsPage();

    return {
        props: {
            title: page.title,
            content: page.content.json
        },
        revalidate: 60 * 5
    }
}
