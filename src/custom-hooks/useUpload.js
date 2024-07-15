import { storage } from '@/config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const useUpload = () => {
    const uploadFile = async (file, link) => {
        if (!file) return null;

        const storageRef = ref(storage, link);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return downloadUrl;
    };

    return { uploadFile };
};

export default useUpload;
