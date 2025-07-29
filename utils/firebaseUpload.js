import bucket from '@/config/firebase';
import { v4 as uuidv4 } from 'uuid';

export const firebaseUpload = async (image) => {
  const buffer = Buffer.from(await image.arrayBuffer());
  const uniqueName = `${uuidv4()}_${image.name}`;
  const file = bucket.file(uniqueName);

  await file.save(buffer, {
    metadata: {
      contentType: image.type,
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
    public: true,
    validation: 'md5',
  });

  const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${
    bucket.name
  }/o/${encodeURIComponent(uniqueName)}?alt=media`;
  return downloadURL;
};
