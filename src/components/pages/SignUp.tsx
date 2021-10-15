import { ChangeEvent, memo, useState, VFC } from "react";
import { Flex, Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Link, Avatar, FormControl, InputRightElement } from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaVoicemail } from "react-icons/fa";
import axios from "axios";
import { User } from "../../types/api/User";
import { useHistory } from "react-router";
import { useMessage } from '../../hooks/useMessage'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEmail = chakra(FaVoicemail)

export const SignUp: VFC = memo(() => {

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handlePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)

  const history = useHistory()

  const { showMessage } = useMessage()

  const createUserParams = () => {
    const userParams = new FormData()
    userParams.append('user[name]', name)
    userParams.append('user[email]', email)
    userParams.append('user[password]', password)
    userParams.append('user[password_confirmation]', passwordConfirmation)
    return userParams
  }

  const singUp = () => {
    const userParams = createUserParams()
    axios.post<User>('http://localhost:3001/api/v1/users', userParams)
      .then((res) => {
        if (res.data) {
          history.push('/')
          showMessage({ title: "Sing Up", status: "success"})
        }
      })
      .catch((e) => {
        showMessage({ title: "Faild to Sign Up", status: "warning" })
        console.error(e)
      })
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
        <Heading color="teal.400">Sign Up to Insta</Heading>
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
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="user name" value={name} onChange={handleName} />
                </InputGroup>
              </FormControl>
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
                    placeholder="Password Confirmation"
                    value={passwordConfirmation}
                    onChange={handlePasswordConfirmation}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={singUp}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link color="teal.500" href="/login">
          Sign In
        </Link>
      </Box>
    </Flex>
  );
});
