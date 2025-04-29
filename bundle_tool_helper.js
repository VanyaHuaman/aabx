import childProcess from 'child_process';
import {TEMP_FILE, TEMP_FILE_PATH} from './constants.js';
import FileHelper from './fileHelper.js'

export default class BundleToolHelper {

    static async freshInstall(filePath) {
        await this.cleanTempFiles();
        await this.bundleTempApk(filePath);
        await this.installTempApk();
        await this.cleanTempFiles();
    }

    static async installTempApk() {
        await new Promise((resolve, reject) => {
            childProcess.exec(`bundletool install-apks --apks=${TEMP_FILE}`, (error) => {
                if (error) {
                    console.error(`install exec error: ${error}`);
                    reject()
                }
                resolve()
            });
        })
    }

    static async bundleTempApk(filePath) {
        await new Promise((resolve, reject) => {
            childProcess.exec(`bundletool build-apks --bundle=${filePath} --output=${TEMP_FILE}`,
                (error) => {
                    if (error) {
                        console.error(`bundletool exec error: ${error}`);
                        reject();
                    }
                    resolve()
                })
        })
    }

    static async cleanTempFiles() {
        await new Promise(async (resolve) => {
            const fileExists = await FileHelper.fileExists(TEMP_FILE_PATH);
            if (fileExists) {
                await FileHelper.removeFile(TEMP_FILE_PATH)
            }
            resolve();
        })
    }
}