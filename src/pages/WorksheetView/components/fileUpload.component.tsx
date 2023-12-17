import {
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { useRef, useState } from 'react';
import BasicInput from '../../../components/BasicInput';
import { Attachment } from '../interface/attachment.interface';
import { v4 as uuidV4 } from 'uuid';
import { useWorksheetViewContext } from '../context/worksheetView.context';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { SimpleButton } from '../../../components/SimpleButton';

interface FileUploadProps {
  onFileUpdates: (attachment: Attachment | undefined) => void;
  height?: number;
  attachment?: Attachment;
}

export function FileUpload({
                             height,
                             onFileUpdates,
                             attachment,
                           }: FileUploadProps) {
  const { rawAttachments, setRawAttachments, canEdit, worksheet } =
    useWorksheetViewContext();

  const ratio = useRef(1);
  const [stateRatio, setStateRatio] = useState(1);
  const [description, setDescription] = useState(attachment?.description || '');

  function setImageRatio(uri: string) {
    Image.getSize(uri, (srcWidth, srcHeight) => {
      const imgRatio = srcWidth / srcHeight;
      if (ratio.current !== imgRatio) {
        ratio.current = srcWidth / srcHeight;
        setStateRatio(imgRatio);
      }
    });
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ['image/jpeg', 'image/png', 'image/jpg'], // Later: 'video/mp4', 'audio/wav', 'audio/mpeg'
    });
    if (result.type == 'success' && result.uri && result.mimeType) {
      if (!result.size || result.size > 1000000) {
        return Toast.show({
          type: 'error',
          text1: 'Datai ist zu groß!',
          text2: 'Bitte wähle eine datai unter 1MB.',
        });
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const fileUUID = uuidV4();
      const attachment = {
        description,
        mimeType: result.mimeType!,
        url: fileUUID,
      };

      setRawAttachments([
        ...rawAttachments,
        {
          mimeType: result.mimeType!,
          name: fileUUID,
          path:
            Platform.OS === 'android'
              ? result.uri
              : result.uri.replace('file://', ''),
        },
      ]);
      onFileUpdates(attachment);
    } else if (result.type !== 'cancel') {
      return Toast.show({
        type: 'error',
        text1: 'Ungöltige Datai!',
        text2: 'Die von dir gewählte datai kann nicht verwendet werden!',
      });
    }
  };

  function renderAttachment(): JSX.Element {
    switch (attachment?.mimeType) {
      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg': {
        const rawAttachment = rawAttachments.find(
          (findAttachment) => findAttachment.name === attachment.url,
        );
        if (!rawAttachment) {
          const fullFilePath = `https://cdn.testive.de/worksheet-attachments/${worksheet._id}/${attachment.url}`;
          setImageRatio(fullFilePath);
          return (
            <Image
              source={{ uri: fullFilePath }}
              style={{
                height: undefined,
                width: '100%',
                resizeMode: 'contain',
                aspectRatio: ratio.current,
                borderRadius: 10,
              }}
            />
          );
        } else {
          setImageRatio(`file://${rawAttachment?.path}`);
          return (
            <Image
              source={{
                uri: `file://${rawAttachment?.path}`,
              }}
              style={{
                height: undefined,
                width: '100%',
                resizeMode: 'contain',
                aspectRatio: ratio.current,
                borderRadius: 10,
              }}
            />
          );
        }
      }
      default:
        return (
          <>
            <Icon name={'cloud-upload-outline'} size={25} />
            <View style={styles.textContainer}>
              <Text style={[styles.header, { fontSize: 12 }]}>
                <Text style={styles.headerHighlight}>Choose file</Text> to
                upload
              </Text>
              <Text style={[styles.subtitle, { fontSize: 10 }]}>
                Image, Video or Audio
              </Text>
            </View>
          </>
        );
    }
  }

  function removeAttachment() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const filteredAttachments = rawAttachments.filter((rawAttachment) =>
      rawAttachment.name !== attachment?.url
    )
    setRawAttachments(filteredAttachments);
    onFileUpdates(undefined);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Datei hochladen</Text>
      <TouchableOpacity
        style={[
          styles.uploadContainer,
          {
            minHeight: height || 100,
            borderColor: attachment ? '#0e6fd5' : '#ababab',
            borderWidth: attachment ? 1 : 2,
            borderStyle: attachment ? 'solid' : 'dashed',
            backgroundColor: attachment ? '#0e6ed505' : '#fff',
          },
        ]}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          if (canEdit) pickDocument();
        }}
      >
        {renderAttachment()}
      </TouchableOpacity>
      {attachment && (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
        }}>
          <BasicInput
            readOnly={!canEdit}
            onChangeText={(t) => {
              setDescription(t)
              onFileUpdates({
                ...attachment,
                description: t,
              });
            }}
            value={description}
            style={{ flex: 1 }}
            placeholder="Optionale beschreibung"
          />
          <SimpleButton
            text={'Anhang Löschen'}
            onPress={() => removeAttachment()}
            iconName={'trash'}
            outlined
            disabled={!canEdit}
            textColor={'#fff'}
            color={'#a80000'}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  uploadContainer: {
    width: '100%',
    borderRadius: 10,
    borderColor: '#ababab',
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  textContainer: { alignItems: 'center' },
  header: { fontWeight: '500' },
  headerHighlight: { color: '#0e6fd5', fontWeight: '700' },
  subtitle: { fontSize: 12, fontWeight: '400', color: '#838383' },
});
