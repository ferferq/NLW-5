//OTHERS
import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import Modal from 'react-modal';
import { Fragment } from 'react';

//IMAGES
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

//COMPONENTS
import { RoomCode } from '../componets/RoomCode';
import { QuestionsComp } from '../componets/Question';

//STYLES
import '../styles/room.scss';
import { Button } from '../componets/Button';
import { database } from '../services/firebase';
import { useState } from 'react';
import { useTheme } from '../hooks/useThemes';
import { ThemeLightOrDark } from '../componets/ThemeLightOrDark';

type RoomParams = {
  id: string;
}

export function AdminRoom () {
  //const { user } = useAuth(); 
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  const { questions, title} = useRoom(roomId);
  const [questionModal, SetModal] = useState<string | undefined>();
  const { theme, themesConfig } = useTheme(); 

  Modal.setAppElement('body')

  async function hundleEndRoom(iType: string) {
    let iFinished = 1;
    if (iType === '1') {
      if (!window.confirm('Deseja Voltar a pagina incial e excluir a sala?')) {
        iFinished = 0;
      }
    }
    if (iFinished === 1) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })

      history.push('/');
    }

  }
  
  async function handleDeleteQuestion(questionId : string | undefined) {
    if (!questionId) {
      return;
    }

    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      SetModal(undefined);
    }    
  }

  async function handleCheckQuestionAsAnswer(questionId : string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered : true,
    });
  }
  async function handleHightLightQuestion(questionId : string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted : true,
    });
  }
  
  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
            <div className="img-themeLightOrDark mobile">
            <button onClick={() =>{hundleEndRoom('1')}}
            ><img className={theme === 'dark' ? 'img-theme-dark' : ''} src={logoImg} alt="letmeask" /></button>
            <ThemeLightOrDark idDark={theme === 'dark' ? true : false} onClick={themesConfig}>tema: {theme === 'dark' ? 'light' : 'dark'}</ThemeLightOrDark>
            </div>
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined onClick={() =>{hundleEndRoom('')}}>Encerrar a sala</Button>
            </div>
        </div>
      </header>

      <main>
        <div className="room-title">
            <h1 className={theme === 'dark' ? 'color-letter-dark' : ''}>Sala {title}</h1>
            { questions.length > 0 &&  <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.length > 0 ? questions.map(question => {
            return (
              <QuestionsComp 
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                { 
                  !question.isAnswered && (
                  <Fragment>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswer(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
  
                  <button
                    type="button"
                    onClick={() => handleHightLightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Destacar Pergunta" />
                  </button>
                  </Fragment>
                  )}
                <button
                  type="button"
                  onClick={() => SetModal(question.id)}
                >
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
                </QuestionsComp>
            );
          }) : <p>Ainda não temos perguntas!</p>}
        </div>
      </main>

      <Modal 
        isOpen={questionModal !== undefined ? true : false}
        style= {{
          overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            border: '1px solid #e559f9',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            outline: 'none',
            padding: '20px',
            width: '100%',
            maxWidth: '500px',
            height: '100%',
            maxHeight: '300px',
            margin: 'auto',
          },
        }
        }
        overlayClassName="Overlay"
        onRequestClose={() => SetModal(undefined)}
      >
        <div id="meu-modal">
        <p>Deseja deletar a pergunta?</p>
        <div className="buttons">
        <Button
           type="button"
           onClick={() => handleDeleteQuestion(questionModal)}
        > Sim </Button>
        <Button
           type="button"
           onClick={() => SetModal(undefined)}
        > Nao </Button>
        </div>
        </div>
     </Modal>
    </div>
  );
}