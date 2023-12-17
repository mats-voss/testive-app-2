import { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Attachment } from '../../../WorksheetView/interface/attachment.interface';

type ComponentProps = {
  attachment: Attachment;
  worksheetId: string
};

export function AttachmentRenderer({ attachment, worksheetId }: ComponentProps) {
  const ratio = useRef(1);
  const [stateRatio, setStateRatio] = useState(1);
  const fullImagePath = `https://cdn.testive.de/worksheet-attachments/${worksheetId}/${attachment.url}`;

  function setImageRatio(uri: string) {
    Image.getSize(uri, (srcWidth, srcHeight) => {
      const imgRatio = srcWidth / srcHeight;
      if (ratio.current !== imgRatio) {
        ratio.current = srcWidth / srcHeight;
        setStateRatio(imgRatio);
      }
    });
  }

  useEffect(() => {
    setImageRatio(fullImagePath);
  });

  return (
    <View>
      <Image
        source={{ uri: fullImagePath }}
        style={{
          height: undefined,
          width: '100%',
          resizeMode: 'contain',
          aspectRatio: ratio.current,
          borderRadius: 10,
        }}
      />
      {attachment.description && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#585858',
            lineHeight: 20,
            marginLeft: 10,
          }}
        >
          {attachment.description}
        </Text>
      )}
    </View>
  );
}
