const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const todosArr = []
const completedTodos = []

const resolvers = {
    Query: {
        todos: (_, {completed}) => {
            if (completed === true) {
                return completedTodos
            } else if (completed === false) {
                let incomplete = []
                todosArr.forEach(todo => {
                    if (!todo.completed) {
                        incomplete.push(todo)
                    }
                })
                return incomplete
            }

            return todosArr
        }, 
        todo: (_, {id}) => {
            return todosArr[id]
        }
    },
    Mutation: {
        addTodo: (_, {name}) => {
            const todo = {name: name, completed: false, id: todosArr.length, date: new Date()}
            todosArr.push(todo)

            pubsub.publish('NEW_TODO', { newTodo: todo }) // Publish!

            return todo
        },
        completeTodo: (_, {id}) => {
            todosArr[id].completed = true
            const todo = todosArr[id]

            completedTodos.push(todo)

            pubsub.publish('COMPLETED_TODO', { completeTodo: todo }) // Publish!

            return todo
        }
    },
    Subscription: {
        newTodo: {
            subscribe: () => pubsub.asyncIterator('NEW_TODO')
        },
        completeTodo: {
            subscribe: () => pubsub.asyncIterator('COMPLETED_TODO')
        }
    }
}

module.exports = resolvers