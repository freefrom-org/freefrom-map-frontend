import React from 'react'
import { trackEvent } from 'utils'

export const checkFormStatus = (props) => {
    // If status has not been updated, form has not yet been submitted.
    if (!props.status) return null

    if (props.status.success) {
        return (
            <div className='mb-5 mb-5 mt-5 alert alert-success d-flex flex-row align-items-center' role='alert'>
                <span>
                    <strong>Thanks for your response!</strong> Someone will be in touch with you soon.
                </span>
                <button className='btn btn-link alert-link' onClick={props.resetForm}>
                    Submit another response
                </button>
            </div>
        )
    } else if (props.status.loading) {
        return (
            <div className='mb-5 mt-5 alert alert-info' role='alert'>
                <strong>Sending your response...</strong>
            </div>
        )
    } else {
        return (
            <div className='mb-5 mb-5 mt-5 alert alert-danger d-flex flex-row align-items-center' role='alert'>
                <span>
                    <strong>Error submitting form!</strong> Please try again later.{' '}
                </span>
                <button className='btn btn-link alert-link' onClick={props.resetForm}>
                    Try again
                </button>
            </div>
        )
    }
}

export const submitForm = (path) => {
    return async (values, { setSubmitting, setErrors, setStatus }) => {
        setStatus({ loading: true })
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/forms/${path}`, {
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        try {
            const result = await res.json()
            if (res.status >= 400) {
                const message = (result && result.description) || 'Unknown error'
                throw new Error(message)
            }
            setStatus({ success: true })
            trackEvent({ category: 'Form', action: 'Submission', label: path })
        } catch (error) {
            console.error(error)
            setStatus({ success: false })
            setSubmitting(false)
            setErrors({ submit: error.message })
        }
    }
}
