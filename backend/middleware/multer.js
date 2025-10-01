import multer from "multer";
import os from "os";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Use serverless writable temp dir on Vercel
        callback(null, os.tmpdir())
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage })

export default upload