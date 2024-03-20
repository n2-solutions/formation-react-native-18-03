import React from "react";
import {
  Box,
  HStack,
  Heading,
  Badge,
  Text,
  AddIcon,
  Button,
  ButtonText,
  GlobeIcon,
  Icon,
  Menu,
  MenuItem,
  MenuItemLabel,
  SettingsIcon,
  ThreeDotsIcon,
  ButtonIcon,
  CloseCircleIcon,
} from "@gluestack-ui/themed";
import { useAuth } from "../../../context/Auth";
import { useNavigate } from "react-router-native";
import { Platform, StatusBar } from "react-native";

const Header = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  const handleDisconnect = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <HStack
      justifyContent="flex-end"
      alignItems="flex-end"
      pr={20}
      width="100%"
      position="absolute"
      top={Platform.OS === "android" ? StatusBar.currentHeight : 0}
    >
      <Menu
        placement="top"
        trigger={(triggerProps) => (
          <Button action="primary" variant="link" {...triggerProps}>
            <ButtonIcon as={ThreeDotsIcon} />
          </Button>
        )}
      >
        <MenuItem disabled key="Community" textValue="Community">
          <Icon as={SettingsIcon} size="sm" mr="$2" />
          <MenuItemLabel size="sm">Settings</MenuItemLabel>
        </MenuItem>
        <MenuItem
          onTouchEnd={handleDisconnect}
          key="Settings"
          textValue="Settings"
        >
          <Icon as={CloseCircleIcon} size="sm" mr="$2" />
          <MenuItemLabel size="sm">Disconnect</MenuItemLabel>
        </MenuItem>
      </Menu>
    </HStack>
  );
};

export default Header;
