import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from '../common/Common.module.css'

import { useRouter } from 'next/router'

export default function Breadcrumbs({ className, text, currentPageTitle }) {
    const router = useRouter()

    return (
        <div className={`breadcrumbs mt-2 mb-3 ${className}`}>
            <button className={'btn back-button pr-0'} onClick={() => router.push('/')}>
                {' '}
                <FontAwesomeIcon icon={faArrowLeft} width="14" className={`mr-1 ${styles['take-action-link']}`} /> {text}
            </button>
            <span className='mx-2'>/</span>
            <span>{currentPageTitle.replace('-', ' ')}</span>
        </div>
    )
}

Breadcrumbs.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    currentPageTitle: PropTypes.string
}

Breadcrumbs.defaultProps = {
    text: 'Back to Policy Map'
}
