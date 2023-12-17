import { Text, View } from 'react-native';

type ComponentProps = {
  question: string;
  index: string | number;
  width?: number;
  isSubHeader?: boolean;
};

export function WorksheetHeader({
  question,
  index,
  width,
  isSubHeader,
}: ComponentProps) {
  return (
    <View
      style={{
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: isSubHeader ? 25 : 30,
          height: isSubHeader ? 25 : 30,
          backgroundColor: isSubHeader ? '#b9ebf7' : '#0e6fd5',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 99999,
        }}
      >
        <Text
          style={{
            fontWeight: '600',
            color: isSubHeader ? '#000' : '#fff',
            fontSize: isSubHeader ? 14 : 16,
          }}
        >
          {index}
        </Text>
      </View>
      <Text
        style={{
          fontWeight: '500',
          fontSize: isSubHeader ? 14 : 16,
          width: width,
        }}
        numberOfLines={1}
      >
        {question || 'Klick zum öffnen/schließen...'}
      </Text>
    </View>
  );
}
