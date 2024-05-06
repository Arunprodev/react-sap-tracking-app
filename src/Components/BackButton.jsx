import { useNavigate } from 'react-router';
import Button from './Button';

function BackButton() {
  const navgition = useNavigate();
  return (
    <Button
      type="back"
      action={(e) => {
        e.preventDefault();
        navgition(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
