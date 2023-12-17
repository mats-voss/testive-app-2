import { View } from 'react-native';

export function TaskContainer({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <View
      style={{
        gap: 10,
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#005ef6',
        borderRadius: 5,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      {children}
    </View>
  );
}
