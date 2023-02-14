import React from 'react'
import PropTypes from 'prop-types'

import SharedLayout from 'components/SharedLayout'
import BackButton from 'components/navigation/BackButton'
import ModalButton from 'components/modal/ModalButton'

import { getAboutPage } from 'lib/contentful-api'
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const documentOptions = {
    renderNode: {
        [BLOCKS.UL_LIST]: (node, children) => <ul className='big-indents'>{children}</ul>,
        [BLOCKS.HEADING_2]: (node, children) => <h2 className='mt-5'>{children}</h2>,
    },
};
  

export default function About({title, content}) {
    return (
        <SharedLayout title='About'>
            <BackButton className='mt-3 mb-2' />
            <h1 className='subpage-header'>{title}</h1>
            {documentToReactComponents(content, documentOptions)}
            <ModalButton text='Full Methodology' href='/methodology' />
        </SharedLayout>
    )
}

About.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object
}

export async function getStaticProps() {
    const page = await getAboutPage();

    return {
        props: {
            title: page.title,
            content: page.content.json
        },
        revalidate: 60 * 5
    }
}
