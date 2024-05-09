/**
 * Consumer Service
 * Bull Queue Job
 */

// TODO: switch case for scheduled or now messages

import Slack from '@slack/bolt'
import dotenv from 'dotenv'
import Job from './job.js'

dotenv.config()

const slackApp = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
})

Job.process(async function (job) {
    const {
        body,
        schedule,
        channels,
        users,
        timezone,
        sender,
    } = job.data

    // const slackRespone = await slackApp.client.chat.postMessage({
    //     token: process.env.SLACK_BOT_TOKEN,
    //     channel: "U06QB3M66G5",
    //     text: job.data.message
    // })

    // console.log("slack response sent")
    // if (slackRespone == null) console.log("null")
    // else console.log(slackRespone)
})