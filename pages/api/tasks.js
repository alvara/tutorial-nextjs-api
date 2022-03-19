
// Fake data
const tasks = [
  { id: 1, title: 'Do laundry', content: 'Need to do Laundry before tomorrow!' }, 
  { id: 2, title: 'Walk the dog', content: 'Kiko needs a walk' }, 
  { id: 3, title: 'Buy groceries', content: 'Get eggs and bread' }
]

export default function handler(req, res) {
  res.status(200).json(tasks)
}
