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
- List all todos, should show all todos:
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
- addTodo, should add a single todo, default priority set to low:
```graphql
# Example Query
mutation AddTodo {
  addTodo(name:"Completed final assessment") {
    name
    date
    completed
    id
  }
}
```
- getTodo, should return a single todo: (id is stored on the todo)
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
- completeTodo, should complete one todo: (id is stored on the todo)
```graphql
mutation CompleteTodo {
  completeTodo(id: 0) {
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
- Stretch: should return not completed todos:
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
- Stretch: Set Priority, should set a priority of high, medium, or low:
```graphql
  mutation SetPriority {
    setPriority(id:0, priority:high){
      name 
      date
      completed 
      id
      priority
    }
  }
```
- Stretch: todosByPriority, should return the todos by priority:
```graphql
# Returns all Todos sorted by priority
  query TodoByPriority {
    todosByPriority {
      name 
      date
      completed 
      id
      priority
    }
  }

# Returns only todos with a specific priority
  query TodoByPriority {
    todosByPriority(priority: high) {
      name 
      date
      completed 
      id
      priority
    }
  }
```

### Subscriptions 
- newTodo, should tell you when a new todo is created:
```graphql
  subscription NewTodo {
    newTodo {
      name
      date
      completed
      id
    }
  }
```
- completedTodo, should tell you when a todo is completed:
```graphql
  subscription CompletedTodo {
    completedTodo {
      name
      date
      completed
      id
    }
  }
```