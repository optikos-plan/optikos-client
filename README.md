# Optikos

A simple project management tool that allows users to visually organize tasks by creating mind maps.

* [Presentation]() - Team presentation
* [Demo](https://optikos-demo.herokuapp.com) - Example demo
  * Serialize/deserialized feature turned off due to edge case issues, users will need to refresh page in order for changes in the canvas to be reflected on sidebar

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

You will need to fork/clone the following repos:

* [Optikos-client](https://github.com/optikos-plan/optikos-client) - Front-end client
* [Data-json](https://github.com/optikos-plan/data-json) - Demo data-store
* [Data-apollo](https://github.com/optikos-plan/data-apollo) - Graph QL server

Once you have the repositories locally, run the following commands:

```
npm install
npm start
```

You should now be able to view:

* DEMO: localhost:8080
* DB: localhost:3000
* GraphQL: localhost:3999/graphiql

## Deployment

This project can be set up live using heroku with the following scripts:

```
create heroku
npm run deploy
```
For optikos-client:
Go into your webpack config and change the URL in the plugin section to point towards your new GraphQL server.

For data-apollo:
Go into your Heroku dashboard and create a config VAR called 'DATASTORE' with a value that equals the URL for your DB server.

## Built With

* [React](https://reactjs.org/) - Front-end framework
* [React-diagrams](https://projectstorm.gitbooks.io/react-diagrams/) - Canvas library
* [Material UI](https://material-ui.com/) - React component library
* [Nodejs](https://nodejs.org/en/) - Back-end
* [GraphQL](https://graphql.org/learn/) - Data query language
* [Apollo](https://www.apollographql.com/) - GraphQL client


## Authors

* **Amal Sudama** - https://github.com/cds-amal
* **Jason Yang** - https://github.com/projectyang
* **Benito Suriano** - https://github.com/benoss90
* **Horacio Gutierrez** - https://github.com/hogutier

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


