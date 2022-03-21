import {tasks} from '../../data/tasks'

export default function handler(req, res) {
  // get a list of tasks
  if(req.method === 'GET') res.status(200).json(tasks)

  // add a task and 
  if(req.method === 'POST') {

    // return error if no task found
    if(!req.body.task) {
      return res.status(400).send({error: 'Please enter a task'})
    } 

    // add task to our array of tasks
    tasks.push({id: tasks.length + 1,title: req.body.task})
    res.status(200).json(tasks)
  }
}
