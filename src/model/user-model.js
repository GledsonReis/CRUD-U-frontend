import { action, thunk } from 'easy-peasy'
import { create } from 'apisauce'

const api = create({ baseURL: 'http://localhost:3001/users' })

const usersModel = {
  user: {
    name: '',
    email: '',
  },
  list: [],
  
  getAllUsers: thunk(async actions => {
    const res = await api.get('')
    const users = res.data
    actions.setUsers(users);
  }),

  setUsers: action((state, users) => {
    state.list = users;
  }),

  createUser: thunk(async (actions, user) => {
    const method = user.id ? 'PUT' : 'POST'
    const url = user.id ? `/${user.id}` : ''
    const res = (method === 'PUT') ?  await api.put(url, user) : await api.post(url, user)
    if(res.ok){
      actions.getAllUsers();
      actions.clearUser();
    }
  }),

  updadeValue: action((state, event) => {
    const user = state.user;
    user[event.target.name] = event.target.value;
    state.user = user;
  }),
  
  getById: action((state, id) =>{
    state.user = state.list.find(u => u.id === id);
  }),

  clearUser: action(state => {
    const resetedUser = {
      name: '',
      email: '',
    };
    state.user = resetedUser;
  }),

  addUser: action((state, user) => {
    state.list = [...state.list, user];
  }),

  removeUser: thunk(async (actions, id) =>{
    const res = await api.delete(`${id}`)
    if(res.ok){
      actions.getAllUsers();
    }
  }),
}

export default usersModel