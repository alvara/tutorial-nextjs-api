import {tasks} from '../../data/tasks'

// list all tasks
export default function handler(req, res) {
  res.status(200).json(tasks)
}
