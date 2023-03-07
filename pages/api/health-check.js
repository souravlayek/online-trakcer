import axios from "axios"
import fs from 'fs'
const handler = async (req, res) => {
  const HOME_SERVER_ENDPOINT = "https://tracker.codevizon.com"
  const WEB_HOOK_ENDPOINT = "https://discordapp.com/api/webhooks/1082012270332215436/11OCfg9gDGDh-AssqL5zkAH7RhBvkMGacAi7lZ0vXKv5Ctm_QdFmlwtniveS48bhlDH1"
  const appendLog = (status) => {
    const isExist = fs.existsSync("./alive.log")
    if (isExist) {
      const alive = fs.readFileSync("./alive.log")
      if(status.toString() != alive.toString()) {
        fs.writeFileSync("./alive.log", status.toString())
        if(status) {
          const successResp = {
            "content": "Hello @everyone",
            "embeds": [
                {
                    "title": "Hi :wave:",
                    "color": 52084,
                    "timestamp": "2023-03-05T19:23:47.234Z",
                    "url": "https://discord.com",
                    "author": {
                        "url": "https://discord.com",
                        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                        "name": "Hosted Tracker"
                    },
                    "thumbnail": {
                        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    },
                    "image": {
                        "url": "https://glitchii.github.io/embedbuilder/assets/media/banner.png"
                    },
                    "footer": {
                        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                        "text": "Please check"
                    },
                    "fields": [
                        {
                            "name": "Status",
                            "value": "*Successful*",
                            "inline": true
                        },
                        {
                            "name": "Service URL",
                            "value": "home.codevizon.com",
                            "inline": true
                        },
                        {
                          "name": "Time",
                          "value": Date.now().toLocaleString(),
                          "inline": false
                      }
                    ],
                    "description": "Your Home Tracker went Up"
                }
            ]
          }
          axios.post(WEB_HOOK_ENDPOINT, successResp)
        }else {
          const failedResp = {
            "content": "Hello @everyone",
            "embeds": [
                {
                    "title": "Hi :wave:",
                    "color": 16065893,
                    "timestamp": "2023-03-05T19:23:47.234Z",
                    "url": "https://discord.com",
                    "author": {
                        "url": "https://discord.com",
                        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                        "name": "Hosted Tracker"
                    },
                    "thumbnail": {
                        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    },
                    "image": {
                        "url": "https://glitchii.github.io/embedbuilder/assets/media/banner.png"
                    },
                    "footer": {
                        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                        "text": "Please check"
                    },
                    "fields": [
                        {
                            "name": "Status",
                            "value": "*Unreachable*",
                            "inline": true
                        },
                        {
                          "name": "Service URL",
                          "value": "home.codevizon.com",
                          "inline": true
                        },
                        {
                            "name": "Time",
                            "value": Date.now().toLocaleString(),
                            "inline": false
                        }
                    ],
                    "description": "Your Home Tracker went down"
                }
            ]
        }
          axios.post(WEB_HOOK_ENDPOINT, failedResp)
        }
      }
    }else {
      fs.writeFileSync("./alive.log", status.toString())
    }
  }
  try {
    const resp = await axios.head(HOME_SERVER_ENDPOINT)
    if(resp.status === 200) {
      appendLog(true)
      res.status(200).send(200)
    }else {
      appendLog(false)
      res.status(400).send(400)
      return
    }
  } catch (error) {
    res.status(400).send(400)
    appendLog(false)
  }
}
export default handler
