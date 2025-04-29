import childProcess from 'child_process';
import fs from 'fs/promises';

export default class FileHelper {
    static async removeFile(filePath) {
        await new Promise((resolve) => {
            childProcess.exec(`rm ${filePath}`, () => {
                resolve()
            })
        })
    }

    static async fileExists(filePath) {
        return await fs.access(`${filePath}`)
            .then(() => true)
            .catch(() => false)
    }
}