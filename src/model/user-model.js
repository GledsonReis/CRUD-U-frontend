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
  
  createUser: thunk(async actions => {
    const res = await api.post('')
    const foodsFromAPI = res.data
    console.log(foodsFromAPI)
    actions.setUsers(foodsFromAPI);
  }),

  // addUser: action((state, user) => {
  //   user.id = uuid.v4();
  //   state.foods = [...state.foods, food];
  // }),
  
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
}

export default usersModel