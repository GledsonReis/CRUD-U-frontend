import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'CRUD de usuários'
}

const baseUrl = "http://localhost:3001/users"

const initializeState = {
  user: { name: '', email: ''},
  list: []
}
export default class UserCrud extends Component {
  state = { ...initializeState };

  UNSAFE_componentWillMount(){
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

  clear() {
    this.setState({ user: initializeState.user })
  }

  save() {
    const user = this.state.user
    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    axios[method](url, user)
      .then(resp => {
        const list = this.getUpdatedList(resp.data, true)
        this.setState({ user: initializeState.user, list })
      })
  }

  getUpdatedList(user, add) {
    const list = this.state.list.filter(u => u.id !== user.id)
    if (add) list.unshift(user)
    return list
  }

  updateFields(event) {
    const user = { ...this.state.user}
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  renderForm() {
    return(
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Nome</label>
              <input type="text" className="form-control" 
                name="name" 
                value={this.state.user.name}
                onChange={e => this.updateFields(e)}
                placeholder="Digite o nome..."/>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input type="text" className="form-control"
              name="email"
              value={this.state.user.email}
              onChange={e => this.updateFields(e)}
              placeholder="Digite o email..."/>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>
              Salvar
            </button>

            <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  load(user){
    this.setState({ user })
  }

  remove(user){
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list })
    })
  }

  renderTable() {
    return(
      <table className="table mt-4">
        <thead>
          <tr> 
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRow()}
        </tbody>
      </table>
    )
  }

  renderRow() {
    return this.state.list.map(user => {
      return(
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className="btn btn-warnig" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Main { ...headerProps}>
        {this.renderForm()}
        <p>Usuários cadastrados: {this.state.list.length}</p>
        {this.renderTable()}
      </Main>
    )
  }
}