import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { IGradeSchema } from '../interface/gradeSchema.interface';
import { SchemaEntryInput } from './SchemaEntryInput';

interface ComponentProps {
  gradeSchema: IGradeSchema
  onSchemaChange?: (schema: IGradeSchema) => void
}

const GradeSchemaAccordion = (
  { gradeSchema, onSchemaChange }: ComponentProps
) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  function addEmptySchema(): void {
    if (onSchemaChange && gradeSchema.canEdit == false) {
      onSchemaChange({ ...gradeSchema, schema: [...gradeSchema.schema, { minPercentage: undefined, grade: '' }] })
    }
  }

  return (
    <View style={{ flexDirection: 'column', gap: 5 }}>
      {/* Header */}
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)} activeOpacity={0.6} style={{
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 6,
        shadowOpacity: 0.07
      }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
            <View style={{
              backgroundColor: '#1874ff',
              borderRadius: 5,
              width: 30,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#1874ff',
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowRadius: 8,
              shadowOpacity: 0.5
            }}>
              <Icon name={'options'} size={20} color={'#fff'}/>
            </View>
            <Text style={{ fontWeight: '600', fontSize: 15 }}>{gradeSchema.name}</Text>
          </View>
          <Icon name={isCollapsed ? 'chevron-back' : 'chevron-down'} size={18}/>
        </View>
      </TouchableOpacity>
      {/* END Header */}

      {/* Content */}
      <Collapsible collapsed={isCollapsed} style={{
        flexDirection: 'column',
        gap: 6,
        padding: 10
      }}>
        <View style={{
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowRadius: 6,
          shadowOpacity: 0.07
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={{ borderColor: '#000', borderWidth: 1, flex: 1, textAlign: 'center', padding: 5 }}>Min.
              Prozent</Text>
            <Text style={{ borderColor: '#000', borderWidth: 1, flex: 1, textAlign: 'center', padding: 5 }}>Note</Text>
          </View>
          {gradeSchema.schema.map((schema, i) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} key={i}>
              <View style={{ borderColor: '#000', borderWidth: 1, flex: 1, padding: 5 }}>
                <SchemaEntryInput placeholder={'...'} value={schema.minPercentage?.toString()} suffix={'%'}
                                  displayOnly={gradeSchema.canEdit == false}/>
              </View>
              <View style={{ borderColor: '#000', borderWidth: 1, flex: 1, padding: 5 }}>
                <SchemaEntryInput placeholder={'...'} value={schema.grade} displayOnly={gradeSchema.canEdit == false}/>
              </View>
            </View>
          ))}
        </View>
        {gradeSchema.canEdit !== false && (
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 4,
            borderRadius: 6,
            backgroundColor: '#fff',
            gap: 3,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 0
            }
          }} onPress={addEmptySchema}>
            <Icon name={'add-circle'} size={25} color={'#4fec39'}/>
            <Text>Reihe hinzufügen</Text>
          </TouchableOpacity>
        )}
      </Collapsible>
    </View>
  )
}

export default GradeSchemaAccordion
