const { gql } = require('apollo-server');

const typeDefs = gql`
    type Todo {
        name: String!
        date: String!
        completed: Boolean!
        id: Int!
        priority: Priority
    }

    enum Priority {
        high
        medium
        low
    }

    type Query {
        todos(completed: Boolean): [Todo!]!
        todo(id: Int!): Todo!
        todosByPriority(priority: Priority): [Todo!]!
    }

    type Mutation {
        addTodo(name: String!, priority: Priority): Todo!
        completeTodo(id: Int!): Todo!
        setPriority(id: Int!, priority: Priority!): Todo!
    }

    type Subscription {
        newTodo: Todo!
        completedTodo: Todo!
    }
`

module.exports = typeDefs