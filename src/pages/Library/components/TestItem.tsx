import { useState } from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TagCategory } from '../interfaces/TagCategory.enum';
import useMongoDate from '../../../hooks/useMongoDate.hook';
import {
  WorksheetDTO
} from '../../WorksheetView/interface/worksheetDto.interface';
import { useAppSelector } from '../../../redux/reduxHooks';
import { getTagsById } from '../redux/tags.slice';

type TestItemProps = {
  worksheet: WorksheetDTO;
  onPress: () => void
}

const TestItem = ({ worksheet, onPress }: TestItemProps) => {
  const [isFav, setIsFav] = useState<boolean>(worksheet?.isFavorite!);
  const worksheetTags = useAppSelector((state) => getTagsById(state, worksheet.tags))

  const getThemeTagsAsString = (): string => {
    const themeTags = worksheetTags?.filter((tag) => {
      return tag.category == TagCategory.THEME
    })
    return themeTags?.map((tag) => tag?.name).join(', ') || ''
  }

  return (
    <TouchableOpacity
      style={{
        height: 260,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: '#cccccc',
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
      onPress={() => onPress()}
    >
      {/* Interaction icons + File icon */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/* Interaction icons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <TouchableOpacity onPress={() => setIsFav(!isFav)}>
            <FontAwesome
              name={isFav ? 'star' : 'star-o'}
              size={18}
              color={isFav ? '#FFD700' : '#b6b6b6'}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome name={'ellipsis-v'} size={18} color={'#868686'} />
          </TouchableOpacity>
        </View>

        {/* File Display */}
        <View>
          {/* Image */}
          <Image
            source={require('../../../../assets/fileIcon.png')}
            style={{
              height: 80,
              width: 80,
            }}
          />

          {/* Icons for future use */}
          {/*{props.name && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesome
                  name={props.icon}
                  size={25}
                  color={props.color || '#000'}
                />
              </View>
            )}*/}
        </View>
      </View>

      {/* Headline infos */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{ fontWeight: 'bold', fontSize: 14, color: '#3e5b6c' }}
          numberOfLines={1}
        >
          {worksheet?.name}
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 10,
            color: 'rgb(155,155,155)',
          }}
          numberOfLines={1}
        >
          {getThemeTagsAsString()}
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={{ flexDirection: 'column', width: '100%', gap: 8 }}>
        {/* Divider */}
        <View
          style={{ width: '100%', height: 0.5, backgroundColor: '#cccccc' }}
        />

        {/* Bottom Infos */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {/* Details */}
          <View style={{ gap: 4, flexDirection: 'row' }}>
            <Text
              style={{ fontSize: 12, fontWeight: '600', color: '#3e5b6c' }}
            >
              Erstellt:
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '400' }}>
              {useMongoDate(worksheet?.createdAt) || 'N/A'}
            </Text>
          </View>

          {/* Shared With Icons for later*/}
          {/*<View
            style={{
              flexDirection: 'row-reverse',
              height: '100%',
              gap: -15,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {props.sharedWith?.slice(0, 4).map((uri: string, i) => (
              <SharedWithIcon
                uri={uri}
                key={i}
                moreHidden={props.sharedWith!.length > 4 && i == 3}
              />
            ))}

            {!props.sharedWith && (
              <TouchableOpacity>
                <SharedWithIcon
                  uri={
                    'https://icon-library.com/images/add-icon-transparent/add-icon-transparent-21.jpg'
                  }
                />
              </TouchableOpacity>
            )}
          </View>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TestItem;
