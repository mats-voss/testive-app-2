import { useAuth0 } from 'react-native-auth0';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const navigationItems: any = {
  home: {label: 'Library', icon: 'folder-open'},
  classes: {label: 'Classes', icon: 'people'},
  tests: {label: 'Tests', icon: 'document-text'},
  settings: {label: 'Settings', icon: 'cog'}
}

const NavigationItem = ({ state, descriptors, navigation}: any) => {
  const { clearCredentials, user } = useAuth0();

  const onLogout = async () => {
    try {
      await clearCredentials();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 15,
      left: 15,
      width: 300,
      backgroundColor: '#fff',
      borderRadius: 15,
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      ...styles.shadow
    }}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%', gap: 5,
          shadowColor: '#488296',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 6
        }}
        onPress={() => onLogout()}>
        <Image source={{ uri: user['picture']}} style={{
          height: 40,
          width: 40,
          borderRadius: 99999
        }}/>
      </TouchableOpacity>

      {state.routes.map((route: any , index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable onPress={onPress} key={index} style={{justifyContent: 'center', alignItems: 'center', height: '100%', gap: 5}}>
            <Icon name={navigationItems[label].icon} size={22} color={isFocused ? '#488296' : 'rgba(0,0,0,0.5)'} style={{
              shadowColor: '#488296',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: isFocused ? 0.8 : 0,
              shadowRadius: 12,
              elevation: 1
            }}/>
            <Text style={{
              color: isFocused ? '#000' : 'rgba(0,0,0,0.5)',
              width: 50,
              textAlign: 'center',
              fontSize: 12
            }}>{navigationItems[label].label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#488296',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  }
})

export default NavigationItem
