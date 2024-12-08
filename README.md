# Mastodon ListenBrainz Link
A small Deno based script to put ListenBrainz current listening song on Mastodon Metadata.

## Usage
### Running
```bash
deno run --allow-net --allow-read --allow-net main.js
```
### Application Token
On your Mastodon instance go to `Preferences > Development`. Create a `New Application`. Give it a name, and select `read:accounts`, `profile`, `write:accounts` scope and save. Copy the `Accsess token`.  
### Environment Variables
```env
MASTODON_URL: Instance URL
MASTODON_TOKEN: Accsess token
LISTENBRAINZ_USER: ListenBrainz Username
NUMBER_OF_FIELDS: Position in Metadat it should write to
```
