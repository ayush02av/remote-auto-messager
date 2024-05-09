/**
 * Slack Listener API
 * Express JS App
 */

// TODO: add slack-listener api
// TODO: define format for slack-messages: scheduled or now
// TODO: add slack-get-all-receipents api to prefill in slack-shortcut-modal
// TODO: api for delivered messages history
// TODO: add README.md

import Job from './job.js'

const response = await Job.add({
    type: "slack",
    message: "send this message"
})

console.log(response.id)