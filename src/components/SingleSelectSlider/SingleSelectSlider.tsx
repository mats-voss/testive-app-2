import {
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface SingleSelectSliderItem {
  _id: string;
  label: string;
}

interface ComponentProps {
  options: SingleSelectSliderItem[];
  containerStyle?: StyleProp<ViewStyle>;
  header?: string;
  isRequired?: boolean;
  readOnly?: boolean;
  selectedOption?: SingleSelectSliderItem;
  onSelect: (option: SingleSelectSliderItem) => void;
}

const SingleSelectSlider = ({
  options,
  containerStyle,
  header,
  isRequired,
  readOnly,
  selectedOption,
  onSelect,
}: ComponentProps) => {
  return (
    <View style={[{ flexDirection: 'column', gap: 5 }, containerStyle]}>
      {header && (
        <Text style={{ fontWeight: '500', fontSize: 14 }}>
          {header}
          {isRequired && (
            <Text style={{ color: '#a80000', fontWeight: '600' }}>*</Text>
          )}
        </Text>
      )}
      <ScrollView
        horizontal
        style={{ opacity: readOnly ? 0.6 : 1 }}
        contentContainerStyle={{ gap: 5 }}
      >
        {options.map((option) => {
          const isActive = selectedOption?._id === option._id;
          return (
            <TouchableOpacity
              key={option._id}
              onPress={() => {
                if (!readOnly) onSelect(option);
              }}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderColor: isActive ? '#000' : '#989898',
                backgroundColor: isActive ? '#000' : '#fff',
                borderRadius: 5,
                borderWidth: 0.5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: isActive ? '#fff' : '#000',
                  alignSelf: 'flex-start',
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SingleSelectSlider;
