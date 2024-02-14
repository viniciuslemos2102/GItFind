import {useState} from 'react';
import {Header} from '../../Components/Header'

import background from '../../Assests/background.svg'
import ItemList from '../../Components/ItemList'

import './styles.css'

function App() {
  const [user, setUser] = useState('');
  const [CurrentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url,name, bio, login} = newUser;
      setCurrentUser({avatar_url,name,bio, login});

      const ReposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await userData.json();

      if(newRepos.length){
        setRepos.newRepos();
      }
    }
  }

  return (
    <div className="App">
      <Header/>
      <div className='conteudo'>
        <img src={background} className='background' alt='background app' /> 
        <div className='info'> 
          <div> 
            <input name="usuario" value={user} 
              onChange={event => setUser(event.value)}
              placeholder='@Username'/>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {CurrentUser?.name ? (
            <>
            <div className='perfil'>
              <img src={CurrentUser.avatar_url} className='profile' alt='image de perfil'/>
              <div>
                <h3>{CurrentUser.name}</h3>
                <span>{CurrentUser.login} </span>
                <p>{CurrentUser.bio} </p>
              </div>
            </div>
            <hr/>
            </>
          ): null}
          {repos?.length ? (
          <div>
            <h4 className='repositorio'>Repositorios</h4>
            {repos.map(repos => (
              
              <ItemList tittle={repos.name} description={repos.description} />
            ))}
           
          </div>
          ) : null}
        </div> 
      </div>
    </div>
  );
}

export default App;
