import {
  LayoutAnimation,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TagItem from './TagItem';
import { useState } from 'react';
import { Tag } from '../../pages/Library/interfaces/tag.interface';
import { TagCategory } from '../../pages/Library/interfaces/TagCategory.enum';

interface ComponentProps {
  title: string;
  placeholder: string;
  tagCategory: TagCategory;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  style?: StyleProp<any>;
  tagSuggestions?: Tag[];
  readOnly?: boolean;
  isRequired?: boolean;
}

const TagInput = (props: ComponentProps) => {
  const [input, setInput] = useState<string>('');

  function submitTag(tagName: string) {
    const existingTag = props.tags.find(
      (tag) => tag.name == tagName && tag.category == props.tagCategory,
    );
    if (!existingTag && tagName) {
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: 200,
      });
      const newTag = { name: tagName, category: props.tagCategory };
      props.setTags([...props.tags, newTag]);
    }
    setInput('');
  }

  return (
    <View style={[{ flexDirection: 'column', gap: 5 }, props.style]}>
      <Text style={{ fontWeight: '500', fontSize: 14 }}>
        {props.title}
        {props.isRequired && (
          <Text style={{ color: '#a80000', fontWeight: '600' }}>*</Text>
        )}
      </Text>
      <View
        style={{
          width: '100%',
          borderWidth: 0.5,
          borderColor: '#989898',
          padding: 6,
          backgroundColor: '#fff',
          borderRadius: 5,
          flexDirection: 'row',
          gap: 5,
          flexWrap: 'wrap',
          minHeight: 43,
        }}
      >
        {!props.readOnly && (
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderColor: '#000',
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            placeholderTextColor={'#626262'}
            placeholder={props.placeholder}
            onSubmitEditing={() => submitTag(input)}
            blurOnSubmit={false}
            onChangeText={(input) => setInput(input)}
            value={input}
            autoCorrect={false}
          />
        )}

        {props.tags.map((tag, index) => (
          <TagItem
            readOnly={props.readOnly}
            text={tag.name}
            key={index}
            onRemove={() => {
              LayoutAnimation.configureNext({
                ...LayoutAnimation.Presets.easeInEaseOut,
                duration: 200,
              });
              props.setTags(
                props.tags.filter((filterTag) => tag !== filterTag),
              );
            }}
          />
        ))}
      </View>

      {!props.readOnly && (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            gap: 5,
            flexWrap: 'wrap',
          }}
        >
          {props.tagSuggestions &&
            props.tagSuggestions
              .filter(
                (tag) =>
                  !props.tags.find((findTag) => tag.name == findTag.name),
              )
              ?.map((tag, i) => (
                <TouchableOpacity
                  onPress={() => submitTag(tag.name)}
                  key={i.toString()}
                >
                  <Text
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderColor: '#989898',
                      borderRadius: 5,
                      borderWidth: 0.5,
                      alignSelf: 'flex-start',
                    }}
                  >
                    {tag.name}
                  </Text>
                </TouchableOpacity>
              ))}
        </View>
      )}
    </View>
  );
};

export default TagInput;
