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
    const foodsFromAPI = res.data
    console.log(foodsFromAPI)
    actions.setUsers(foodsFromAPI);
  }),

  setUsers: action((state, users) => {
    state.list = users;
  }),

  createUser: thunk(async (actions, user) => {
    const res = await api.post('', user)
    if(res.ok){
      actions.getAllUsers();
    }
  }),

  updadeValue: action((state, event) => {
    const user = state.user;
    user[event.target.name] = event.target.value;
    state.user = user;
  }),
  
  // getById: action((state,id) =>{

  // }),

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
  

  // toggle: action((state, id) => {
  //   state.foods.map(food => {
  //     if (food.id === id) {
  //       food.completed = !food.completed;
  //     }
  //     return food;
  //   });
  // }),

  // remove: action((state, id) => {
  //   state.foods = state.foods.filter(food => food.id !== id);
  // })

  removeUser: thunk(async (actions, id) =>{
    const res = await api.delete(`${id}`)
    if(res.ok){
      actions.getAllUsers();
    }
  }),
}

export default usersModel