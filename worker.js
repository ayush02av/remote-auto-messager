/**
 * Consumer Service
 * Bull Queue Job
 */

// TODO: remove consoles
// TODO: slack channel dynamic from job.data
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
    console.log(job.id)
    console.log(job.data)

    console.log(process.env.SLACK_BOT_TOKEN)
    console.log(process.env.SLACK_CHANNEL)
    console.log(job.data.message)

    const slackRespone = await slackApp.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: "U06QB3M66G5",
        text: job.data.message
    })
    console.log("slack response sent")
    if (slackRespone == null) console.log("null")
    else console.log(slackRespone)
})