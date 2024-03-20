import React, { useState, useEffect } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
}

const Quiz: React.FC = () => {
  const [quizCore] = useState(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // If there are no more questions, set the quiz as completed
    if (!quizCore.hasNextQuestion() && quizCore.getCurrentQuestion() === null) {
      setIsCompleted(true);
    }
  }, [quizCore]);

  // Update the score and question index based on interactions
  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setSelectedAnswer(null); // Reset the selected answer preparing for the next question

      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
      } else {
        setIsCompleted(true);
      }
    }

  } 

  // Fetch current question from QuizCore
  const currentQuestion = quizCore.getCurrentQuestion();
  // Calculate score dynamically based on QuizCore's state
  const score = quizCore.getScore();

  // Render the completion screen if the quiz is completed
  if (isCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
        {/* You can add a button here to restart the quiz or navigate elsewhere */}
      </div>
    );
  }


  // Render the quiz screen with the current question and options
  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;