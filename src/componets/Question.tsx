import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/questions.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function QuestionsComp ({content, author, isAnswered = false, isHighLighted=false, children}: QuestionProps) {
  return (
    <div className={cx('question', {answersed:isAnswered}, {highlighted:isHighLighted && !isAnswered})}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}