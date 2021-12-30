import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import AuthService from "./services/AuthService";
import {IUser} from "../models/IUser";
import UserService from "./services/UserService";


const App: FC = () => {

   const {store} = useContext(Context);
   const [users, setUsers] = useState<IUser[]>([]);

   useEffect(() => {
      console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token')) {
         store.checkAuth();
      }
   }, []);

   async function getUsers() {
      try {
         const response = await UserService.fetchUsers();
         setUsers(response.data);

      } catch (err) {
         console.log(err);

      }
   }

   if (store.isLoading) {
      return (
         <div>
            Загрузка...
         </div>
      );
   }

   if (!store.isAuth) {
      return (
         <>
            <LoginForm/>
            <div>
               <button onClick={getUsers}>Получить пользователей</button>
            </div>
         </>
      );
   }

  return (
     <div>
        <h1>{store.isAuth ? `Пользователь ${store.user.email} авторизован` : 'Авторизуйтесь'}</h1>
        <h1>{store.user.isActivated ? `Аккаунт подтвержден по почте` : `Подтвердите аккаунт на ${store.user.email}`}</h1>
       <button onClick={() => store.logout()}>Выйти</button>
        <div>
           <button onClick={getUsers}>Получить пользователей</button>
        </div>
        {users.map( user =>
           <div key={user.email}>{user.email}</div>
        )}
     </div>
  )

}

export default observer(App);
