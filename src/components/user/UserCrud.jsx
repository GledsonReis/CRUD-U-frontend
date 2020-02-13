import React, { useEffect, useRef } from 'react';
import Main from '../template/Main'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useForm } from 'react-hook-form'
import composeRefs from '@seznam/compose-react-refs'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'CRUD de usuários'
}

export default function UserCrud({ id }) {
  const users = useStoreState(state => state.users.list);
  const user = useStoreState(state => state.users.user);
  const getAllUsers = useStoreActions(actions => actions.users.getAllUsers);
  const updateFields = useStoreActions(actions => actions.users.updadeValue);
  const loadUser = useStoreActions(actions => actions.users.getById);
  const add = useStoreActions(actions => actions.users.createUser);
  const remove = useStoreActions(actions => actions.users.removeUser);
  const clear = useStoreActions(actions => actions.users.clearUser);

  // validateform
  const { register, handleSubmit, errors } = useForm();

  // focus
  const mainRef = useRef(null);

  useEffect(()=>{
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  function handleClick(id){
    loadUser(id);
    mainRef.current.focus();
  }

  return (
    <Main { ...headerProps}>
      <form className="form" onSubmit={handleSubmit(e => add(user))}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Nome</label>
              <input type="text" className="form-control" 
                name="name" 
                value={user.name}
                onChange={e => updateFields(e)}
                placeholder="Digite o nome..."
                ref={composeRefs(mainRef, register({ required: true }))} />
                {errors.name && <span className="text-danger">This field is required</span>}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input type="text" className="form-control"
              name="email"
              value={user.email}
              onChange={e => updateFields(e)}
              placeholder="Digite o email..."
              ref={register({ required: true })}/>
              {errors.email && <span className="text-danger">This field is required</span>}
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>

            <button type="button" className="btn btn-secondary ml-2" onClick={e => clear(e)}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
      <p>Usuários cadastrados: {users.length}</p>
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warnig" onClick={e => handleClick(user.id)}>
                  <i className="fa fa-pencil"></i>
                </button>
                <button className="btn btn-danger ml-2" onClick={e => remove(user.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Main>
  )
}