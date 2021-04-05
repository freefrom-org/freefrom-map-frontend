import React from 'react';
import { Formik, Form } from 'formik';
import Head from 'next/head';

import BackButton from "components/navigation/BackButton";
import { site } from "constants/index"
import SharedLayout from "components/SharedLayout";

import Input from "components/forms/Input";
import Select from "components/forms/Select";
import Checkbox from "components/forms/Checkbox";
import FormLabel from "components/forms/FormLabel";
import Submit from "components/forms/Submit";

import TakeAction from "components/common/TakeAction";

import { states } from 'constants/forms';

import { checkFormStatus, submitForm } from 'utils'

export default function PartnerWithFreefrom() {
    return (
        <div>
            <Head>
                <title>Partner with FreeFrom - { site.name }</title>
            </Head>
            <SharedLayout>
                <BackButton className="mt-3 mb-2" />
                <h1 className="subpage-header">Partner with FreeFrom</h1>
                <p>Is your organization interested in partnering with FreeFrom? Please fill out the following information and we will get back to you as soon as possible.</p>
                <Formik initialValues={{}} onSubmit={submitForm("partner-with-freefrom")}>
                    {props => {
                        const formStatus = checkFormStatus(props)
                        if (formStatus) return formStatus
                        return (
                            <Form className="col-12 col-lg-8 mb-5">
                                <Input className="text-uppercase" label="Your name" name="name" required={ true } />
                                <Input className="text-uppercase" label="Your email" name="email" required={ true } type="email" />
                                <Input className="text-uppercase" label="Your pronouns" name="pronouns" required={ true } />
                                <Input className="text-uppercase" label="Your organization" name="organization" required={ true } />
                                <Input className="text-uppercase" label="Your title" name="title" required={ true } />
                                <Select className="text-uppercase" label="Your state" name="state" required={ true } options={ states }/>
                                <div className="form-group">
                                    <div className="text-uppercase"><FormLabel required={ true }>How would you like to partner with FreeFrom?</FormLabel></div>
                                    <Checkbox name="goals" value="policy_innovation_sprint">Request a policy innovation sprint</Checkbox>
                                    <Checkbox name="goals" value="help_drafting_legislation">Help with drafting legislation</Checkbox>
                                    <Checkbox name="goals" value="plan_event_or_webinar">Plan a policy related event or webinar</Checkbox>
                                    <Checkbox name="goals" value="pass_survivor_wealth_centered_legislation">Pass survivor wealth centered legislation in my state</Checkbox>
                                </div>
                                {props.values.goals && props.values.goals.indexOf("pass_survivor_wealth_centered_legislation") !== -1 &&
                              <div className="form-group">
                                  <div className="text-uppercase"><FormLabel required={ true }>What phase of the process are you in?</FormLabel></div>
                                  <Checkbox name="process_phase" value="need_guidance">I need guidance on centering my organization’s policy priorities to be more survivor-wealth informed</Checkbox>
                                  <Checkbox name="process_phase" value="have_an_idea">I have a policy idea but need help with getting started</Checkbox>
                                  <Checkbox name="process_phase" value="developed_a_coalition">I’ve developed a coalition or a network to support my policy idea</Checkbox>
                                  <Checkbox name="process_phase" value="spoke_with_state">I’ve spoken with my state representative about my policy idea</Checkbox>
                                  <Checkbox name="process_phase" value="ready_to_introduce">My state representative is ready to introduce my policy idea into a bill</Checkbox>
                                  <Checkbox name="process_phase" value="finish_line">I need help getting a bill to the finish line</Checkbox>
                              </div>
                                }
                                <Submit />
                            </Form>
                        )
                    }}
                </Formik>
                <TakeAction />
            </SharedLayout>
        </div>
    )
}
