import { setCookies, getCookie } from 'cookies-next';

export default function handler(req, res) {
  
  
  // edit the task
  if(req.method === 'PUT'){
    // Get tasks and id to remove
    const {id, title} = JSON.parse(req.body)
    console.log(id, title)
    let tasks = JSON.parse(getCookie('tasks',{ req, res}))

    // edit the task with the given id
    tasks = tasks.map((task) => {
      if(task.id === id){
        task.title = title
      }
      return task
    }) 
    console.log(tasks)
    setCookies('tasks', tasks,{ req, res})
    res.status(200).send('task edited')
  }

  // delete the task
  if(req.method === 'DELETE'){

    // Get tasks and id to remove
    let tasks = JSON.parse(getCookie('tasks',{ req, res}))
    const {id} = req.query

    // remove the task with the given id
    tasks = tasks.filter((task) => task.id !== parseInt(id)) 
    setCookies('tasks', tasks,{ req, res})
    res.status(200).send('task deleted')
  }
}
