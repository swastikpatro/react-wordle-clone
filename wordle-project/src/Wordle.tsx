import { useEffect, useState } from 'react';

const Wordle = () => {
  const [attempt, setAttempt] = useState(1);
  const [currentGuess, setCurrentGuess] = useState('');
  const [recordOfGuesses, setRecordOfGuess] = useState<string[]>([]);

  const handleInput = (e) => {
    const key = `${e.key}`;

    if (key === 'Enter') {
      if (currentGuess.length !== 5) {
        console.log("Can't submit as len is not 5");

        return;
      }

      if (recordOfGuesses.includes(currentGuess)) {
        console.log("Can't submit as we already have it in records");
        return;
      }
      setAttempt(attempt + 1);
      setRecordOfGuess((prevArr) => [...prevArr, currentGuess]);
      setCurrentGuess('');
    }

    // delete letter in currentGuess
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }

    // set guess
    if (
      key.length === 1 &&
      key.toUpperCase().charCodeAt(0) >= 65 &&
      key.toUpperCase().charCodeAt(0) < 91
    )
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleInput);

    return () => {
      window.removeEventListener('keyup', handleInput);
    };
  }, [handleInput]);

  return <div className='App'>Wordle Clone - {currentGuess}</div>;
};

export default Wordle;
