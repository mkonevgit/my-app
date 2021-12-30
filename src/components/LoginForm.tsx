import React, {useState, FC, useContext} from 'react';
import {Context} from '../index';
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const {store} = useContext(Context);
   return (
      <div>
         <input
            type="text"
            value={email}
            placeholder='Email'
            onChange={(event) => setEmail(event.target.value)}
         />
         <input
            type="text"
            value={password}
            placeholder='Пароль'
            onChange={(event) => setPassword(event.target.value)}
         />
         <button onClick={() => store.login(email, password)}>Логин</button>
         <button onClick={() => store.registration(email, password)}>Регистрация</button>
      </div>
   )
};

export default observer(LoginForm);
