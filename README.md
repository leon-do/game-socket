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

e. Browser Wallet: sends {user: 0xAlice, receipt: 0xtxHash} to socket

f. Server Socket: recieves message and emits

g. Browser Wallet: Redirect Alice back to game

h. Desktop Game: recieves response and display txHash