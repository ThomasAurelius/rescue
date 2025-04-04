// uploadImage.js
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebaseConfig";

/**
 * Uploads an image file to Firebase Storage.
 *
 * @param {File} file - The image file to upload.
 * @param {string} path - The storage path (folder) to store the file, e.g., "uploads".
 * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded image.
 */
export async function uploadImage(file, path = "uploads") {
	return new Promise((resolve, reject) => {
		if (!file) {
			return reject(new Error("No file provided"));
		}

		// Generate a reference with a unique filename
		const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		// Listen for state changes, errors, or completion of the upload.
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Optional: You can track upload progress here.
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`Upload is ${progress}% done`);

				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
				console.error("Upload error:", error);
				reject(error);
			},
			() => {
				// Handle successful uploads on complete, get the download URL.
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadURL) => {
						console.log("File available at", downloadURL);
						resolve(downloadURL);
					})
					.catch(reject);
			}
		);
	});
}
