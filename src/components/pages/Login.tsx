import { ChangeEvent, memo, useState, VFC } from "react";
import { Flex, Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Link, Avatar, FormControl, FormHelperText, InputRightElement } from "@chakra-ui/react";
import { FaVoicemail, FaLock } from "react-icons/fa";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { User } from "../../types/api/User";
import { useMessage } from '../../hooks/useMessage'
import { useRecoilState } from 'recoil'
import { userState } from '../../store/userState'

const CFaLock = chakra(FaLock);
const CFaEmail = chakra(FaVoicemail)


export const Login: VFC = memo(() => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const history = useHistory()

  const { showMessage } = useMessage()

  const [authenticatedUser, setAuthenticatedUser] = useRecoilState(userState)

  const createSessionParams = () => {
    const sessionParams = new FormData()
    sessionParams.append('session[email]', email)
    sessionParams.append('session[password]', password)
    return sessionParams
  }

  const login = () => {
    const data = createSessionParams()
    axios.post<User>('http://localhost:3001/api/v1/session', data)
      .then((res) => {
        if (res.data) {
          setAuthenticatedUser(res.data)
          history.push('/signup')
          showMessage({ title: "logged in", status: "success" })
        }
      })
      .catch((e) => {
        console.error(e)
        showMessage({ title: "faild to login", status: "warning" })
      })

    // fetch('http://localhost:3001/api/v1/session', {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: data
    // }).then((res) => res.json())
    // .then((data) => {
    //   console.log(data.token)
    //   localStorage.setItem("token", data.token)
    // })
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome to Insta</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaEmail color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" value={email} onChange={handleEmail} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                onClick={login}
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="/signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
});
