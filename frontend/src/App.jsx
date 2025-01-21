import React, { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import FlipMove from "react-flip-move"; // Import FlipMove

const socket = io("ws://localhost:5000");

const correctSound = new Audio("/sounds/correct.wav");
const wrongSound = new Audio("/sounds/wrong.mp3");

function App() {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [seconds, setSeconds] = useState();
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
   
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && room) {
      setInfo(true);
    }
  };

  useEffect(() => {
    if (name) {
      socket.emit("joinRoom", room, name);
    }
  }, [info]);

  useEffect(() => {
    socket.on("newQuestion", (data) => {
      setQuestion(data.question);
      setOptions(data.answers);
      setAnswered(false);
      setSeconds(data.timer);
      setSelectedAnswerIndex(null);
      setCorrectAnswerIndex(null);
    });

    socket.on("answerResult", (data) => {
      setCorrectAnswerIndex(data.correctAnswer); // Mark the correct answer
      setScores(
        data.scores.sort((a, b) => b.score - a.score) // Sort leaderboard by score
      );

      
    });

    socket.on("gameOver", (data) => {
      setWinner(data.winner);
    });

    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("gameOver");
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) return;

    const timerInterval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [seconds]);

  const handleAnswer = (answerIndex) => {
    if (!answered) {
        setSelectedAnswerIndex(answerIndex); // Mark the selected answer
        socket.emit("submitAnswer", room, answerIndex); // Emit the answer to the server
        setAnswered(true); // Set answered to true to disable further interaction
    } else {
        setTimeout(() => {
            setSelectedAnswerIndex(null); // Reset the selected answer index after timeout
            setCorrectAnswerIndex(null); // Optionally reset the correct answer index if you use it
            socket.emit("requestNextQuestion", room); // Request the next question from the server
            setAnswered(false); // Allow the next answer to be submitted
        }, 5000); // Delay for 5 seconds
    }
};

useEffect(() => {
  if (answered && selectedAnswerIndex !== null && correctAnswerIndex !== null) {
    if (selectedAnswerIndex === correctAnswerIndex) {
      correctSound.play(); // Play correct sound
    } else {
      wrongSound.play(); // Play wrong sound
    }
  }
}, [answered, selectedAnswerIndex, correctAnswerIndex]);
  if (winner) {
    return <div className="winner">
        <h1>Winner is {winner}!</h1>;
      </div>
  }

  return (
    <div className="App">
      {!info ? (
        <div className="join-div">
          <h1>QuizClash</h1>
          <form onSubmit={handleSubmit}>
            <input
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              placeholder="Enter room no"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button type="submit" className="join-btn">
              JOIN
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="header">
          <h1>QuizClash </h1>
          <p className="room-id">Room Id: {room}</p>
          </div>
          <ToastContainer />

          {question ? (
            <div className="quiz-div">
              <p>Remaining Time: {seconds}s</p>
              <div className="question">
                <p className="question-text">{question}</p>
              </div>
              <ul>
                {options.map((answer, index) => (
                  <li key={index}>
                  <button
                    className={`options 
                      ${answered && index === correctAnswerIndex ? "correct" : ""}
                      ${answered && index === selectedAnswerIndex && index !== correctAnswerIndex ? "wrong" : ""}
                    `}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                  >
                    {answer}
                  </button>
                </li>
                ))}
              </ul>
              <h2 className="leaderboard-title">Leaderboard</h2>
              <FlipMove
                duration={400}
                easing="ease-in-out"
                staggerDelayBy={30} // Add stagger for smoother cascading effect
              >
                {scores.map((player, index) => (
                  <div key={player.name} className="leaderboard-item">
                    <span className="rank">{index + 1}.</span>
                    <span className="name">{player.name}</span>
                    <span className="score">{player.score}</span>
                  </div>
                ))}
              </FlipMove>
            </div>
          ) : (
            <p>Loading question...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
