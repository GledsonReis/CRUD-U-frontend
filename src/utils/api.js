import { create } from 'apisauce'

const api = create({
  baseUrl: "http://localhost:3001/users",
})

export default api