import { useState } from 'react';
import { Text, View } from 'react-native';

type ComponentProps = {
  question: string;
  index: string | number;
  width?: number;
  isSubHeader?: boolean;
};

export function TaskHeader({
  question,
  index,
  width,
  isSubHeader,
}: ComponentProps) {
  const [amountOfLines, setAmountOfLines] = useState(1);

  return (
    <View
      style={{
        marginLeft: -50,
        gap: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: amountOfLines === 1 ? 'center' : 'flex-start',
        width: '90%',
      }}
    >
      <View
        style={{
          width: isSubHeader ? 30 : 40,
          height: isSubHeader ? 30 : 40,
          backgroundColor: isSubHeader ? '#bdd5ee' : '#0e6fd5',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 99999,
        }}
      >
        <Text
          style={{
            fontWeight: '900',
            color: isSubHeader ? '#000' : '#fff',
            fontSize: isSubHeader ? 16 : 20,
          }}
        >
          {index}
        </Text>
      </View>
      <Text
        style={{
          fontWeight: '600',
          fontSize: isSubHeader ? 17 : 21,
          width: width,
        }}
        onTextLayout={(layout) =>
          setAmountOfLines(layout.nativeEvent.lines.length)
        }
      >
        {question || 'Klick zum öffnen/schließen...'}
      </Text>
    </View>
  );
}
