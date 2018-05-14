const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 8080
const app = express()

const GRAPHQL_URI = process.env.GRAPHQL_URI || 'http://localhost:3999/graphql'
console.log('GRAPHQL_URI', GRAPHQL_URI)
console.dir(process.env)

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
