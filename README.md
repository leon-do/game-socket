# Game Socket

## Install

`yarn`

`yarn dev`

`open client/index.html`

## Flow

a. Desktop Game: Alice clicks "Pay"

b. Desktop Game: opens socket connection and waits for response

c. Desktop Game: deeps like to browser wallet (index.html): https://chainsafe.github.io/game-desktop?action=send&from=0xAlice&to=0xtoAddress&value=123

d. Browser Wallet: Metamask popus up. Alice signs tx gets txHash: 0xtxHash

e. Browser Wallet: Sends 0xAlice-0xtxHash to socket

f. Browser Wallet: Redirect Alice back to game

g. Server Socket: Recieves message

h. Server Socket: Emits message

i. Desktop Game: Recieves response and display txHash

## Notes

https://medium.com/unity-nodejs/websocket-client-server-unity-nodejs-e33604c6a006