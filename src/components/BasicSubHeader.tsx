import { DimensionValue, StyleSheet, Text, View } from 'react-native';

interface ComponentProps {
  title: string;
  subTitle: string;
  maxTextWidth?: DimensionValue;
}

const BasicSubHeader = ({ title, subTitle, maxTextWidth }: ComponentProps) => {
  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.subjectsHeader}>{title}</Text>
      <Text style={[styles.subjectSubtitle, { width: maxTextWidth }]}>
        {subTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subjectsHeader: {
    fontWeight: '600',
    fontSize: 18,
  },
  subjectSubtitle: {
    color: '#484848',
    fontSize: 13,
  },
});

export default BasicSubHeader;
