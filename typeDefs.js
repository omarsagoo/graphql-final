const { gql } = require('apollo-server');

const typeDefs = gql`
    type Todo {
        name: String!
        date: String!
        completed: Boolean!
        id: Int!
    }

    type Query {
        todos(completed: Boolean): [Todo!]!
        todo(id: Int!): Todo!
    }

    type Mutation {
        addTodo(name: String!): Todo!
        completeTodo(id: Int!): Todo!
    }

    type Subscription {
        newTodo: Todo!
        completeTodo: Todo!
    }
`

module.exports = typeDefs