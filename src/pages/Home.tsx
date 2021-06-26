//OTHERS
import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useThemes';

//IMAGES
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

//COMPONENTS
import { Button } from '../componets/Button';

//STYLE
import '../styles/auth.scss';
import { ThemeLightOrDark } from '../componets/ThemeLightOrDark';


export function Home () {
  const history = useHistory();
  const { user,signInWithGoogle } = useAuth(); 
  const [roomCode, SetRoomCode] = useState('');
  const { theme, themesConfig } = useTheme(); 

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();;
    }
      history.push('/rooms/news');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = database.ref(`rooms/${roomCode}`).get();

    if (!(await roomRef).exists()) {
      alert('Room does not exists');
      return;
    }

    if ((await roomRef).val().endedAt) {
      alert('Room Already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);

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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => SetRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
          <ThemeLightOrDark themeAdd="theme-Home" idDark={theme === 'dark' ? true : false} onClick={themesConfig}>Selecione o tema: {theme === 'dark' ? 'light' : 'dark'}</ThemeLightOrDark>
        </div>
      </main>
    </div>
  );
}