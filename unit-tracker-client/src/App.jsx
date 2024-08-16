import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/layout/Home';
import { Login } from './components/Login';
import { UserProfile } from './components/UserProfile';
import { Admin } from './components/Admin';
import { CreateAccount } from './components/CreateAccount';
import { DynamicEntries } from './components/DynamicEntries';
import { EditAddDynamicEntries } from './components/EditAddDynamicEntries';
import { EditAddStaticEntries } from './components/EditAddStaticEntries';
import { StaticEntries } from './components/StaticEntries';
import { ReportGeneration } from './components/ReportGeneration';
import './styles/App.css';
import { Layout } from './components/layout/Layout';
import { Box, Button, Link, Heading } from '@chakra-ui/react';
import { MyCalendar } from './utils/Calendar';
import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { loggedIn } = useContext(UserContext);

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={loggedIn ? <Navigate to="/Home" /> : <Login />} />
          <Route path="/Login" element={loggedIn ? <Navigate to="/Home" /> : <Login />} />

          {/* Protected Routes */}
          {loggedIn ? (
            <>
              <Route
                path="/Home"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/Calendar"
                element={
                  <Layout>
                    <MyCalendar />
                  </Layout>
                }
              />
              <Route
                path="/UserProfile"
                element={
                  <Layout>
                    <UserProfile />
                  </Layout>
                }
              />
              <Route
                path="/Admin"
                element={
                  <Layout>
                    <Admin />
                  </Layout>
                }
              />
              <Route
                path="/CreateAccount"
                element={
                  <Layout>
                    <CreateAccount />
                  </Layout>
                }
              />
              <Route
                path="/DynamicEntries"
                element={
                  <Layout>
                    <DynamicEntries />
                  </Layout>
                }
              />
              <Route
                path="/EditAddDynamicEntries"
                element={
                  <Layout>
                    <EditAddDynamicEntries />
                  </Layout>
                }
              />
              <Route
                path="/EditAddStaticEntries"
                element={
                  <Layout>
                    <EditAddStaticEntries />
                  </Layout>
                }
              />
              <Route
                path="/StaticEntries"
                element={
                  <Layout>
                    <StaticEntries />
                  </Layout>
                }
              />
              <Route
                path="/ReportGeneration"
                element={
                  <Layout>
                    <ReportGeneration />
                  </Layout>
                }
              />
            </>
          ) : (
            <Route
              path="*"
              element={
                <Box textAlign="center" mt={10}>
                  <Heading mb={4}>Login Required</Heading>
                  <Link href="/">
                    <Button colorScheme="teal">Go to Login</Button>
                  </Link>
                </Box>
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
