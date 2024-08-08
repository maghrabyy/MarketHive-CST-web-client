import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../firebaseconfig';

// import { useNavigate } from 'react-router-dom';

function Login() {
  // const navigate = useNavigate();
  const [Userdata, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, Userdata.email, Userdata.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    if (e.target.name == 'userEmail') {
      setUserData({ ...Userdata, email: e.target.value });
    }
    if (e.target.name == 'userPassword') {
      setUserData({ ...Userdata, password: e.target.value });
    }
  };

  return (
    <div>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Please enter your email"
          name="userEmail"
          value={Userdata.email}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>password</FormLabel>
        <Input
          placeholder="password"
          name="userPassword"
          value={Userdata.password}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </FormControl>
      <Button
        type="submit"
        colorScheme="teal"
        size="md"
        onClick={() => handleLogIn()}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
