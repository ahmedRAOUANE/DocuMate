const { useState } = require("react");
import { ref } from "firebase/storage";
import { storage } from "@/config/firebase";

const useUploadData = () => {
    const [uploadedUrl, setUploadedUrl] = useState("");

    // const currentUser = 

    const uploadFiles = async (file) => {
        const storagRef = ref(storage, "files/")
    }

    const uploadData = async (payload) => {
    }

    return { uploadData, uploadFiles }
}

