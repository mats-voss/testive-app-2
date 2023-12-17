import { Text, View } from 'react-native';

export function Error404() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '800',
        }}
      >
        404 - Not found!
      </Text>
    </View>
  );
}
