import { useState } from 'react'
import './App.css'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function App() {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Hello, Material UI!
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        disabled={isDisabled}
      >
        Click Me
      </Button>
    </div>
  );
}

export default App;
