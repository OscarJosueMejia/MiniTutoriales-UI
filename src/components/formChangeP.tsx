import { useState } from "react"
import { string } from "yup";

interface User {
  uid: string;
  name: string;
}

const tempUser: User = {
  uid:'sdsd',
  name:'sdsd'
}

export const Usuario = () => {

    const [user, setUser] = useState<User>(tempUser);

    const login = () => {
      setUser({
        uid: 'ABC123',
        name: 'Angelito'
      })
    }

      return (
        <div className="mt-5">
            <h3>Cambiar Contraseña</h3>
            
            <button 
                onClick={login}
                className='btn btn-outline-primary mt-2'>
                Login
            </button>

            {
              (!user)
              ? <pre>No hay usuario</pre>
              : <pre> {JSON.stringify(user)}</pre>
            }

            <hr></hr>
        </div>
      )
}
