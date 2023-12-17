import { LayoutAnimation, Text, View } from 'react-native';
import BasicInput from '../../../components/BasicInput';
import { FileUpload } from './fileUpload.component';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useState } from 'react';
import { useWorksheetViewContext } from '../context/worksheetView.context';
import { TaskOptions } from '../interface/tasks/task.interface';
import Toast from 'react-native-toast-message';

type ComponentProps = {
  onTaskChange: (task: TaskOptions) => void;
  task: TaskOptions;
};

export function BasicQuestionAndAttachment({
  onTaskChange,
  task,
}: ComponentProps) {
  const { rawAttachments, setRawAttachments, canEdit } =
    useWorksheetViewContext();
  const [useFileUpload, setUseFileUpload] = useState<boolean>(
    Boolean(task.attachment),
  );

  return (
    <View style={{ gap: 20 }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <BasicInput
            isRequired
            readOnly={!canEdit}
            value={task.question}
            onChangeText={(i) =>
              onTaskChange({
                ...task,
                question: i,
              })
            }
            placeholder={'Beschreibe hier den arbeitsauftag...'}
            header={'Arbeitsauftrag'}
            style={{ flex: 1 }}
          />
          <BasicInput
            isRequired
            isNumberInput
            readOnly={!canEdit}
            value={task.points.toString() || ''}
            onChangeText={(i) => {
              let pointsAsNumber = Number(i);
              if (isNaN(pointsAsNumber)) {
                Toast.show({
                  type: 'error',
                  text1: 'Nur Zahlen erlaubt!',
                  text2: 'Bitte gib nur Zahlen als punkte ein.',
                });
                pointsAsNumber = 0;
              }
              onTaskChange({
                ...task,
                points: pointsAsNumber,
              });
            }}
            placeholder={'Punkte PRO richtige antwort...'}
            header={'Punkte'}
            style={{ width: 100 }}
          />
        </View>
        {canEdit && (
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <BouncyCheckbox
              disabled={!canEdit}
              size={18}
              disableText
              fillColor="#ccc"
              iconStyle={{ borderRadius: 5 }}
              innerIconStyle={{ borderRadius: 5 }}
              isChecked={useFileUpload}
              onPress={(isChecked) => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setUseFileUpload(isChecked);
                if (!isChecked) {
                  if (!task.attachment?.url.startsWith('https://')) {
                    const filteredAttachments = rawAttachments.filter((rawAttachment) =>
                      rawAttachment.name !== task.attachment?.url
                    )
                    console.log(filteredAttachments)
                    setRawAttachments(filteredAttachments);
                  }
                  onTaskChange({
                    ...task,
                    attachment: undefined,
                  });
                }
              }}
            />
            <Text style={{ color: '#434343' }}>
              Anhang nutzen
            </Text>
          </View>
        )}
      </View>

      {useFileUpload && (
        <FileUpload
          attachment={task.attachment}
          onFileUpdates={(attachment) => {
            onTaskChange({
              ...task,
              attachment,
            });
          }}
        />
      )}
    </View>
  );
}
