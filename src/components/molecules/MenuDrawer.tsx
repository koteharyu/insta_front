import { memo, VFC } from "react";
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, Button } from '@chakra-ui/react'

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickTimeLine: () => void;
  onClickLogin: () => void;
  onClickSignUp: () => void;
}

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { onClose, isOpen, onClickTimeLine, onClickLogin, onClickSignUp } = props
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button onClick={onClickTimeLine} w="100%">Time Line</Button>
            <Button onClick={onClickLogin} w="100%">Login</Button>
            <Button onClick={onClickSignUp} w="100%">Sign Up</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
})
