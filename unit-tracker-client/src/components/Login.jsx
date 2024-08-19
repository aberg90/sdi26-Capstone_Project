import { Button, Link, Input, Box, Heading, Image } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { getFetch, postFetch } from '../utils/Fetches';
import { UserContext } from '../context/UserContext';
import { PersonnelContext } from '../context/PersonnelContext';
import { SupervisorContext } from '../context/SupervisorContext';
import { useNavigate } from 'react-router-dom';

const apiURL = 'http://localhost:8080';

export const Login = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });
  const { setUser, setOrg, setLoggedIn } = useContext(UserContext);
  const { setPersonnel, personnel } = useContext(PersonnelContext);
  const { setSupervisor } = useContext(SupervisorContext);
  const navigate = useNavigate();

  const submitLogin = async () => {
    console.log(`Login submitted`);
    console.log(JSON.stringify(userDetails)); // Logging the userDetails object
    try {
      const response = await postFetch(`users/login`, userDetails);
      if (response) {
        await fetchUserData(userDetails.username);
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const fetchSupervisor = async (sup_Id) => {
    console.log(personnel);
    const supervisorResponse = await getFetch(`users/id/${sup_Id}`);
    setSupervisor({
      id: supervisorResponse.id,
      first_name: supervisorResponse.first_name,
      last_name: supervisorResponse.last_name,
      supervisor_id: supervisorResponse.supervisor_id,
      my_unit_id: supervisorResponse.my_unit_id,
      supervisor: supervisorResponse.supervisor,
    });
  };

  const fetchPersonnel = async (userId) => {
    const personnelResponse = await getFetch(`users/personnel/${userId}`);
    setPersonnel({
      id: personnelResponse.id,
      first_name: personnelResponse.first_name,
      last_name: personnelResponse.last_name,
      supervisor_id: personnelResponse.supervisor_id,
      my_unit_id: personnelResponse.my_unit_id,
      supervisor: personnelResponse.supervisor,
    });
  };

  const fetchUserData = async (username) => {
    try {
      const userResponse = await fetch(`${apiURL}/users/username/${username}`);
      const userData = await userResponse.json();
      console.log(`This is line 67 on Login JSX userResponse`, userResponse);

      if (userResponse) {
        console.log(`userResponse was ok and recieved ${userData}`);
        if (userData.supervisor) {
          fetchPersonnel(userData.id);
        }
        if (userData.supervisor_id) {
          console.log(`This is line 73 on login.jsx; the supervisor is ${userData.supervisor_id}`);
          fetchSupervisor(userData.supervisor_id);
        }
        setUser({
          id: userData.id,
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
          supervisor_id: userData.supervisor_id,
          my_unit_id: userData.my_unit_id,
          available: userData.available,
          admin: userData.admin,
          supervisor: userData.supervisor,
        });

        const orgResponse = await fetch(`${apiURL}/units/${userData.my_unit_id}`);
        const orgData = await orgResponse.json();

        if (orgResponse) {
          setOrg({
            id: orgData.id,
            name: orgData.unit_name,
            reports_to: orgData.reports_to,
          });

          setLoggedIn(true);
          navigate('/home');
          console.log(`User and organization data set for user ID: ${userData.id}/`);
        } else {
          console.error('Failed to fetch organization data', orgData);
          alert('Failed to fetch organization data', orgData);
        }
      } else {
        console.error('Failed to fetch user data', userData);
        alert('Failed to fetch user data', userData);
      }
    } catch (err) {
      console.error('Error fetching user data', err);
      alert('Error fetching user data', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt="10"
      padding="6"
      boxShadow="lg"
      borderRadius="lg"
      position="relative"
    >
      <Image
        src="/assets/image.png"
        alt="Background"
        position="absolute"
        mt={290}
        top="50%"
        left="50%"
        transform="translate(-50%, -50%) scale(2)" // Scale the image to 200% of its original size
        opacity="0.1"
        zIndex="-1"
        borderRadius="50%" // Makes the image circular
        w="150%" // Makes the image 50% larger
        h="auto" // Keeps the aspect ratio intact
      />
      <Heading as="h1" size="lg" mb="6" textAlign="center" whiteSpace="nowrap">
        OPTIC
      </Heading>
      <Input
        placeholder="Username"
        name="username"
        value={userDetails.username}
        onChange={handleChange}
        mb="4"
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        value={userDetails.password}
        onChange={handleChange}
        mb="4"
      />
      <Button colorScheme="blue" width="full" onClick={submitLogin} mb="4">
        Login
      </Button>
      <Link href="/CreateAccount">
        <Button colorScheme="teal" width="full">
          Create Account
        </Button>
      </Link>
    </Box>
  );
};
