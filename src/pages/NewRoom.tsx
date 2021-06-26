//OTHERS
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '../hooks/useThemes';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

//IMAGES
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

//COMPONENTS
import { Button } from '../componets/Button';
import { ThemeLightOrDark } from '../componets/ThemeLightOrDark';

//STYLE
import '../styles/auth.scss';


export function NewRoom () {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, SetRom] = useState('');
  const { theme, themesConfig } = useTheme(); 

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }
    
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire suas dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main className={theme}>
        <div className="main-content">
          <img className={theme === 'dark' ? 'img-theme-dark' : ''} src={logoImg} alt="letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => SetRom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
          <ThemeLightOrDark themeAdd="theme-Home" idDark={theme === 'dark' ? true : false} onClick={themesConfig}>Selecione o tema: {theme === 'dark' ? 'light' : 'dark'}</ThemeLightOrDark>
        </div>
      </main>
    </div>
  );
}