/**
 * Slack Listener API
 * Express JS App
 */

// TODO: api for delivered messages history
// TODO: add README.md

import Job from './job.js'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

import Slack from '@slack/bolt'
import dotenv from 'dotenv'

dotenv.config()

const slackApp = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
})

let receipentsResponse = null

app.get('/', async function (req, res) {
    if (!receipentsResponse) {
        receipentsResponse = {
            channels: (await slackApp.client.conversations.list()).channels.filter(function (_conversation) {
                return _conversation.is_channel === true
            }).map(function (_channel) {
                return {
                    id: _channel.id,
                    name: _channel.name,
                    // members: (await slackApp.client.conversations.members({ channel: _channel.id })).members
                }
            }),
            members: (await slackApp.client.users.list()).members.filter(function (_user) {
                return _user.is_bot === false
            }).map(function (_user) {
                return {
                    id: _user.id,
                    name: _user.name,
                    real_name: _user.real_name,
                }
            })
        }
    }

    res.send(receipentsResponse)
})

app.post('/message', async function (req, res) {
    const {
        body,
        schedule,
        channels,
        users,
        timezone,
        sender,
    } = req.body

    const response = await Job.add({
        body,
        schedule,
        channels,
        users,
        timezone,
        sender,
    })
    return res.send({
        id: response.id
    })
})

app.post('/interact', async function (req, res) {
    console.log(req.headers)
    console.log(req.body)
    setTimeout(function () {
        res.send('ok')
    }, 5000)
})

app.listen(port, function () {
    console.log("Server started up and running")
})