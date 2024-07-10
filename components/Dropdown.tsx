import RoundBtn from '@/components/RoundBtn';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import Colors from '@/constants/Colors';
import { Foundation, FontAwesome6, Entypo, AntDesign } from '@expo/vector-icons';

const Dropdown = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const togglePopUpMenu = () => {
    setIsOpened(!isOpened)
  }

  return (
    <Menu opened={isOpened} onBackdropPress={togglePopUpMenu}>
      <MenuTrigger style={styles.button}>
        <RoundBtn onPress={togglePopUpMenu} icon={'ellipsis-horizontal'} text={'More'} />
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsWrapper: styles.wrapper
      }}>
        <MenuOption onSelect={() => alert(` You clicked on Save`)} style={styles.optionContainer} >
          <Text>Statement</Text>
          <Foundation name="list-bullet" size={24} color={Colors.dark} />
        </MenuOption>
        <MenuOption onSelect={() => alert(`You Clicked on Delete`)} style={styles.optionContainer}>
          <Text>Converter  </Text>
          <FontAwesome6 name="arrows-rotate" size={24} color={Colors.dark} />
        </MenuOption>
        <MenuOption onSelect={() => alert(`You Clicked on Delete`)} style={styles.optionContainer}>
          <Text>Background</Text>
          <Entypo name="images" size={24} color={Colors.dark} />
        </MenuOption>
        <MenuOption onSelect={() => alert(`You Clicked on Delete`)} style={styles.optionContainer}>
          <Text>Add new account</Text>
          <AntDesign name="addfolder" size={24} color={Colors.dark} />
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  button: {
    textAlign: 'center',
    display: 'flex',
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.lightGray
  },
  wrapper: {
    position: "absolute",
    padding: 10,
    right: 0,
    top: 60,
    borderRadius: 10,
    backgroundColor: "white"
  }
});

export default Dropdown;