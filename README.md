# crypto-client

Client application for encrypt API.

## How to use

```
npm i
npm run build

client.js json-rmq encrypt text
```

Environment variables:

- `HTTP_ADDRESS`- HTTP server ('http://localhost:8088')
- `RMQ_ADDRESS` - RabbitMQ server ('localhost')

Uasge:

```
client.js rest-http encrypt <clear-string> // uses REST HTTP
client.js rest-http decrypt <encrypted-string> // uses REST HTTP
client.js json-rmq encrypt <clear-string> // uses RabbitMQ
client.js json-rmq decrypt <encrypted-string> // uses RabbitMQ
```
