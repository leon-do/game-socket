# Game Socket

## Install

`yarn`

`yarn dev`

`open client/index.html`

## Flow

a. Desktop Game: Alice clicks "Pay"

b. Desktop Game: opens socket connection 

c. Server Socket: waits for response

d. Desktop Game: deeps like to browser wallet (index.html): https://chainsafe.github.io/game-desktop?action=send&from=0xAlice&to=0xtoAddress&value=123

e. Browser Wallet: Metamask popus up. Alice signs tx gets txHash: 0xtxHash

f. Browser Wallet: sends {id: 0xAlice, receipt: 0xtxHash} to socket

g. Server Socket: recieves message from wallet

h. Server Socket: emits message

i. Browser Wallet: Redirect Alice back to game

j. Desktop Game: recieves response and display txHash

## Notes

https://medium.com/unity-nodejs/websocket-client-server-unity-nodejs-e33604c6a006