import { useState } from 'react';
import { Text, View } from 'react-native';

type PointsDisplayProps = {
  possiblePoints: number;
  achievedPoints?: number;
};

export function PointsDisplay({
  possiblePoints,
  achievedPoints,
}: PointsDisplayProps) {
  const [width, setWidth] = useState(0);

  return (
    <View
      onLayout={(layout) => setWidth(layout.nativeEvent.layout.width)}
      style={{
        position: 'absolute',
        bottom: 10,
        right: -(width + 25),
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#080808',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <Text
        style={{
          fontWeight: '800',
          color: '#000',
          fontSize: 16,
        }}
      >
        {achievedPoints || '_'} / {possiblePoints}
      </Text>
    </View>
  );
}
