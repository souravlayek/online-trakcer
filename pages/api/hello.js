// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default function handler(req, res) {
  const WEB_HOOK_ENDPOINT = "https://discordapp.com/api/webhooks/1082012270332215436/11OCfg9gDGDh-AssqL5zkAH7RhBvkMGacAi7lZ0vXKv5Ctm_QdFmlwtniveS48bhlDH1"

  axios.post(WEB_HOOK_ENDPOINT, {content:"test"})
  res.status(200).json({ name: 'John Doe' })
}
