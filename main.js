import "@std/dotenv/load"
import { createRestAPIClient } from 'https://esm.sh/masto@6.10.1'

const masto = createRestAPIClient({
  url: process.env.MASTODON_URL,
  accessToken: process.env.MASTODON_TOKEN,
});

const user = process.env.LISTENBRAINZ_USER
const no = process.env.NUMBER_OF_FIELDS

var last_playing = null

console.log("Running")
setInterval(async () => {
  let now_playing_fetch = await fetch(`https://api.listenbrainz.org/1/user/${user}/playing-now`)
  let now_playing_res = await now_playing_fetch.json()
  if (now_playing_res.payload.count == 1) {
    let playing = `${now_playing_res.payload.listens[0].track_metadata.track_name}`
    let artist = ` [${now_playing_res.payload.listens[0].track_metadata.artist_name || now_playing_res.payload.listens[0].track_metadata.release_name || ''}]`
    playing += artist == ' []'? '' : artist
    if (playing != last_playing) {
      let curAccount = await masto.v1.accounts.verifyCredentials()
      let fields = curAccount.fields
      // TODO: Parse fields to links and remove html
      fields[no-1] = {name: "Listening to ...", value: playing}
      let res = await masto.v1.accounts.updateCredentials({
        fieldsAttributes: fields
      })
      last_playing = playing
    }
  } else {
    let curAccount = await masto.v1.accounts.verifyCredentials()
    let fields = curAccount.fields
    fields[no-1] = {name: "Listening to ...", value: "Nothing right now"}
    const res = await masto.v1.accounts.updateCredentials({
      fieldsAttributes: fields
    })
  }
}, 10*1000)