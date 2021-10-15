import { memo, VFC } from "react";
import { Flex, Heading, Box, Link, useDisclosure } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { MenuIconButton } from "../atoms/button/MenuIconButton";
import { MenuDrawer } from "../molecules/MenuDrawer";
import { useRecoilState } from 'recoil'
import { userState } from '../../store/userState'
import { useMessage } from '../../hooks/useMessage'

export const Header: VFC = memo(() => {

  const [authenticatedUser, setAuthenticatedUser] = useRecoilState(userState)

  const history = useHistory()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClickTimeLine = () => history.push('/')
  const onClickLogin = () => history.push('/login')
  const onClickSignUp = () => history.push('/signup')

  const logout = () => {
    setAuthenticatedUser(null)
    showMessage({ title: "logout", status: "success" })
  }

  const { showMessage } = useMessage()

  return (
    <>
      <Flex as="nav" bg="white" color="gray.505" align="center" justify="space-between" padding={{ base: 3, md: 5 }}>
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickTimeLine}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>Insta</Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
          <Box pr={4}>
            <Link onClick={onClickTimeLine}>
              Time Line
            </Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickLogin}>
              Login
            </Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickSignUp}>
              Sign Up
            </Link>
          </Box>
          {authenticatedUser &&
            <>
              <Box pr={4}>
                <Link>
                  {authenticatedUser.user.name}
                </Link>
              </Box>
              <Box>
                <Link onClick={logout}>
                  Log out
                </Link>
              </Box>
            </>
          }
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} onClickTimeLine={onClickTimeLine} onClickLogin={onClickLogin} onClickSignUp={onClickSignUp} />
    </>
  )
})
