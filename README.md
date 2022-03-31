# Wix TPA
This is a demo app to showcase how to support multiple comlink connections in the same parent window.
You can see the working sample here: https://wix-tpa.surge.sh/

# How this solution works

1. Once the parent loads, it waits for a handshake message from each iframe
2. When iframe loads, it sends a handshake message to parent with bridge data (comlink + version)
3. Parent window creates `MessageChannel` to open up a communication port to each iframe
4. Parent window ramps up a comlink connection with the right version for that iframe

# Iframe SDK
This solution relies on [wix-dashboard-iframe-sdk](https://github.com/wix-incubator/wix-dashboard-iframe-sdk) which holds the mechanism for iframe handshake.

# Development
Start the project by running:

```sh
yarn install
yarn 
```