import React from 'react'
import PropTypes from 'prop-types'

import SharedLayout from 'components/SharedLayout'
import BackButton from 'components/navigation/BackButton'

import { getMethodologyPage } from 'lib/contentful-api';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const documentOptions = {
    renderMark: {
        [MARKS.SUPERSCRIPT]: (text) => {
            const refNumber = text.match(/\d+/)?.[0] ?? "";
            return (
                <sup>
                    <a
                        href={`#fn${refNumber}`}
                        id={`ref${refNumber}`}
                        title={`Jump to footnote ${refNumber} citation.`}
                    >
                        {text}
                    </a>
                </sup>
            );
        },
        [MARKS.SUBSCRIPT]: (text) => {
            const refNumber = text.match(/\d+\./)?.[0]?.replace(".", "") ?? "";
            text = text.replace(/\d+\./, "");
            return (
                <sub id={`fn${refNumber}`}>
                    <a
                        href={`#ref${refNumber}`}
                        title={`Jump back to footnote ${refNumber} in the text.`}
                    >
                        {refNumber}.
                    </a>
                    {text}
                </sub>
            );
        },
    },
    renderNode: {
        [BLOCKS.UL_LIST]: (node, children) => <ul className='big-indents'>{children}</ul>,
        [BLOCKS.QUOTE]: (node, children) => <ul className='no-bullets'>{children}</ul>,
    },
    renderText: (text) => {
        const markCriteriaMet = "[criteria-met]";
        const markCriteriaNotMet = "[criteria-not-met]";
        const markCriteriaMaybeMet = "[criteria-maybe-met]";
        const markInnovativeIdea = "[innovative-idea]";
        const markHonorableMention = "[honorable-mention]";

        if (text.includes(markCriteriaMet)) {
            return (
                <>
                    <img src='images/criteria-met.png' className='checklistIcon' alt='Criteria Met' />
                    {text.replace(markCriteriaMet, "")}
                </>
            )
        }
        if (text.includes(markCriteriaMaybeMet)) {
            return (
                <>
                    <img src='images/criteria-maybe-met.png' className='checklistIcon' alt='Criteria Maybe Met' />
                    {text.replace(markCriteriaMaybeMet, "")}
                </>
            )
        }
        if (text.includes(markCriteriaNotMet)) {
            return (
                <>
                    <img src='images/criteria-not-met.png' className='checklistIcon' alt='Criteria Not Met' />
                    {text.replace(markCriteriaNotMet, "")}
                </>
            )
        }
        if (text.includes(markInnovativeIdea)) {
            return (
                <>
                    <img src='images/innovative-idea.png' className='checklistIcon' alt='Innovative Idea' />
                    {text.replace(markInnovativeIdea, "")}
                </>
            )
        }
        if (text.includes(markHonorableMention)) {
            return (
                <>
                    <img src='images/honorable-mention.png' className='checklistIcon' alt='Honorable Mention' />
                    {text.replace(markHonorableMention, "")}
                </>
            )
        }
        
        return text;
    },
};

export default function Methodology({title, content}) {
    return (
        <SharedLayout title='Methodology'>
            <BackButton className='mt-3 mb-2' />
            <h1 className='subpage-header hyphenate'>Methodology</h1>
            {documentToReactComponents(content, documentOptions)}
        </SharedLayout>
    )
}

Methodology.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object
}

export async function getStaticProps() {
    const page = await getMethodologyPage();

    return {
        props: {
            title: page.title,
            content: page.content.json
        },
        revalidate: 60 * 5
    }
}
