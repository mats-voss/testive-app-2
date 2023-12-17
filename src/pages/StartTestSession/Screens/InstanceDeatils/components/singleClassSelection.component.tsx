import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Tag } from '../../../../Library/interfaces/tag.interface';
import TagItem from '../../../../../components/TagInput/TagItem';
import { SchoolClass } from '../../../../SchoolClassOverview/interfaces/schoolClass.interface';

type ComponentProps = {
  header: string;
  subHeader: string;
  schoolClasses: SchoolClass[];
  onSchoolClassSelect: (schoolClass: SchoolClass) => void;
  selectedSchoolClass?: SchoolClass;
};

export function SingleClassSelection({
  header,
  subHeader,
  schoolClasses,
  onSchoolClassSelect,
  selectedSchoolClass,
}: ComponentProps) {
  function isSelectedOrNull(schoolClass: SchoolClass) {
    return (
      selectedSchoolClass == undefined || selectedSchoolClass === schoolClass
    );
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
        {schoolClasses?.map((schoolClass) => (
          <TouchableOpacity
            key={schoolClass._id}
            onPress={() => onSchoolClassSelect(schoolClass)}
            style={{
              opacity: isSelectedOrNull(schoolClass) ? 1 : 0.15,
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
              Klasse {schoolClass.year?.name}
              {schoolClass.identifier}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
