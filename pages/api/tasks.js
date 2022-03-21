import { checkCookies, setCookies, getCookie } from 'cookies-next';

export default async function handler(req, res) {
  // initialize tasks if cookie does not exist
  if(checkCookies('tasks',{ req, res}) === false) {
    setCookies('tasks', [{id: 1, title: 'Learn Next.js'}, {id: 2, title: 'Learn React'}],{ req, res})
  }
  
  // get tasks from cookies
  if(req.method === 'GET') {
    const tasks = getCookie('tasks',{ req, res})
    return res.status(200).json(tasks)
  }

  // add a task
  if(req.method === 'POST') {

    // return error if no task found
    if(!req.body.task) {
      return res.status(400).send({error: 'Please enter a task'})
    } 

    // add task to cookie
    let tasks = JSON.parse(getCookie('tasks',{ req, res}))
    tasks.push({id: tasks.length + 1,title: req.body.task})

    // commit new changes to cookie
    setCookies('tasks', tasks,{ req, res})
    res.status(200).send('task added')
  }
}
