import { setCookies, getCookie } from 'cookies-next';

export default function handler(req, res) {
  // edit the task
  if(req.method === 'PUT'){
    const {id, title} = JSON.parse(req.body)
    let tasks = JSON.parse(getCookie('tasks',{ req, res}))

    // update title for matching task id
    tasks = tasks.map((task) => {
      if(task.id === id) task.title = title
      return task
    }) 

    // commit new changes to cookie
    setCookies('tasks', tasks,{ req, res})
    res.status(200).send('task edited')
  }

  // delete the task
  if(req.method === 'DELETE'){

    // Get tasks and id to remove
    const {id} = req.query
    let tasks = JSON.parse(getCookie('tasks',{ req, res}))

    // remove the task with the given id
    tasks = tasks.filter((task) => task.id !== parseInt(id)) 

    // commit new changes to cookie
    setCookies('tasks', tasks,{ req, res})
    res.status(200).send('task deleted')
  }
}
