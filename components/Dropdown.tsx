import RoundBtn from '@/components/RoundBtn';
import { View, StyleSheet, Text } from 'react-native';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

const Dropdown = () => {
  return (
    <Menu opened={true}>
      <MenuTrigger style={styles.button}>
        <RoundBtn icon={'ellipsis-horizontal'} text={'More'} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => alert(` You clicked on Save`)} text="Save" />
        <MenuOption onSelect={() => alert(`You Clicked on Delete`)}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert(`Not called`)}
          disabled={true}
          text="Disabled"
        />
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
  }
});

export default Dropdown;