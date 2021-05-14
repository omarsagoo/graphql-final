const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const todosArr = []
const completedTodos = []
const priorityHigh =[]
const priorityNormal = []
const priorityLow = []

const resolvers = {
    Query: {
        todos: (_, {completed}) => {
            if (completed == true) {
                return completedTodos
            } else if (completed == false) {
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
        },
        todosByPriority: (_, {priority}) => {
            if(priority === "high") {
                return priorityHigh
            } else if (priority === 'normal') {
                return priorityNormal
            } else if (priority === 'low') {
                return priorityLow
            } else {
                let all = []

                all.push(...priorityHigh)
                all.push(...priorityNormal)
                all.push(...priorityLow)

                return all
            }
        }
    },
    Mutation: {
        addTodo: (_, {name, priority = 'low'}) => {
            const todo = {name: name, completed: false, id: todosArr.length, date: new Date(), priority: priority}
            todosArr.push(todo)

            // faster than sorting the array of objects
            if(priority === "high") {
                priorityHigh.push(todo)
            } else if (priority === 'normal') {
                priorityNormal.push(todo)
            } else if (priority === 'low') {
                priorityLow.push(todo)
            }

            pubsub.publish('NEW_TODO', { newTodo: todo }) // Publish!

            return todo
        },
        completeTodo: (_, {id}) => {
            todosArr[id].completed = true
            const todo = todosArr[id]

            completedTodos.push(todo)

            pubsub.publish('COMPLETED_TODO', { completedTodo: todo }) // Publish!

            return todo
        },
        setPriority: (_, {id, priority='low'}) => {
            todosArr[id].priority = priority
            const todo = todosArr[id]

            // faster than sorting the array of objects
            if(priority === "high") {
                priorityHigh.push(todo)
            } else if (priority === 'normal') {
                priorityNormal.push(todo)
            } else if (priority === 'low') {
                priorityLow.push(todo)
            }

            return todo
        }
    },
    Subscription: {
        newTodo: {
            subscribe: () => pubsub.asyncIterator('NEW_TODO')
        },
        completedTodo: {
            subscribe: () => pubsub.asyncIterator('COMPLETED_TODO')
        }
    }
}

module.exports = resolvers