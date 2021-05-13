# FEW 2.9 Final Assessment

Your goal is to build a GraphQL Todo application. For this assignment, you will build a server that supports your GraphQL schema. You will write the schema, resolvers, and some queries that test query types in your schema. 

# Todo GraphQL

Your goal is to make a GraphQL todo app. It should be able to:

- display a list of todos
- create new todos
- and mark a todo completed or not completed

## Challenges

### Server

- GraphQL Apollo server
- Enable Graphiql

### Queries
- getAllTodos, should return a list of todos:
```graphql
  query Todos {
    todos {
      name 
      date
      completed 
      id
    }
  }
```
- getTodo, should return a single todo:
```graphql
  query Todo {
    todo(id: 0) {
      name 
      date
      completed 
      id
    }
  }
```
- getCompletedTodos, returns a list of completed todos:
```graphql
  query Todos {
    todos(completed: true) {
      name 
      date
      completed 
      id
    }
  }
```
	- Stretch: can return not completed todos:
```graphql
  query Todos {
    todos(completed: false) {
      name 
      date
      completed 
      id
    }
  }
```