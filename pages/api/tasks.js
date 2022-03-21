
// Fake data
const tasks = [
  { id: 1, title: 'Do laundry' }, 
  { id: 2, title: 'Walk the dog'}, 
  { id: 3, title: 'Buy groceries'}
]

// list all tasks
export default function handler(req, res) {
  res.status(200).json(tasks)
}
