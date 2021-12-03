# Game Socket

## Install

`yarn`

`yarn dev`

Open client/index.html

## Flow

- Desktop Game: Alice clicks "Pay"

- Desktop Game: opens socket connection and waits for response from 0xAlice

- Desktop Game: deeps like to browser wallet (index.html): https://chainsafe.github.io/game-desktop?action=send&from=0xAlice&to=0xtoAddress&value=123

- Browser Wallet: Metamask popus up. Alice signs tx gets txHash: 0xtxHash

- Browser Wallet: sends {user: 0xAlice, receipt: 0xtxHash} to socket

- Server Socket: recieves message and emits

- Browser Wallet: Redirect Alice back to game

- Desktop Game: recieves response and display txHash