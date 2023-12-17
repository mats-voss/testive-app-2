import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Tag } from '../../../../Library/interfaces/tag.interface';
import TagItem from '../../../../../components/TagInput/TagItem';

type ComponentProps = {
  header: string;
  subHeader: string;
  tags: Tag[];
  onTagSelect: (tag: Tag) => void;
  selectedTag?: Tag;
};

export function SingleTagSelection({
  header,
  subHeader,
  tags,
  onTagSelect,
  selectedTag,
}: ComponentProps) {
  function isSelectedOrNull(tag: Tag) {
    return selectedTag == undefined || selectedTag === tag;
  }

  return (
    <View style={{ gap: 10 }}>
      {/* Header */}
      <View style={{ gap: 0 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
          }}
        >
          {header}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'left',
            color: '#545454',
            width: 600,
          }}
        >
          {subHeader}
        </Text>
      </View>

      {/* Tag Container */}
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          flexWrap: 'wrap',
        }}
      >
        {tags?.map((tag) => (
          <TouchableOpacity
            key={tag._id}
            onPress={() => onTagSelect(tag)}
            style={{
              opacity: isSelectedOrNull(tag) ? 1 : 0.15,
              backgroundColor: '#000',
              borderColor: '#000',
              borderRadius: 5,
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 5,
              paddingHorizontal: 14,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '500',
              }}
            >
              {tag.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
