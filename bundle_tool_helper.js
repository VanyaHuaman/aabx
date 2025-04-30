import childProcess from 'child_process';
import {TEMP_FILE, TEMP_FILE_PATH} from './constants.js';
import FileHelper from './fileHelper.js';
import ora from 'ora';

export default class BundleToolHelper {

    static async installTempApk() {
        await new Promise((resolve, reject) => {
            const spinner = ora('Installing Apk').start();
            spinner.color = 'green';
            childProcess.exec(`bundletool install-apks --apks=${TEMP_FILE}`, (error) => {
                if (error) {
                    spinner.fail('Failed to Install Apk')
                    console.error(`bundletool install exec error: ${error}`);
                    reject()
                }
                spinner.succeed('Apk Installed')
                resolve()
            });
        })
    }

    static async bundleTempApk(filePath) {
        await new Promise((resolve, reject) => {
            const spinner = ora('Bundling Apk').start();
            spinner.color = 'green';
            childProcess.exec(`bundletool build-apks --bundle=${filePath} --output=${TEMP_FILE}`,
                (error) => {
                    if (error) {
                        spinner.fail('Failed to Bundle Apk')
                        console.error(`bundletool exec error: ${error}`);
                        reject();
                    }
                    spinner.succeed('Apk Bundled')
                    resolve()
                })
        })
    }

    static async cleanTempFiles(showSpinner) {
        await new Promise(async (resolve) => {
            const spinner = ora('Cleaning Up')
            if (showSpinner) {
                spinner.start();
                spinner.color = 'green';
            }
            const fileExists = await FileHelper.fileExists(TEMP_FILE_PATH);
            if (fileExists) {
                await FileHelper.removeFile(TEMP_FILE_PATH)
            }
            if (showSpinner) {
                spinner.succeed("Cleaned Up")
            }
            resolve();
        })
    }

    static async getPackageName(filePath) {
        const spinner = ora('Retrieving App Package Name')
        return await new Promise((resolve, reject) => {
            spinner.start();
            spinner.color = 'green';
            childProcess.exec(`bundletool dump manifest --bundle=${filePath} | grep "package=" | awk -F 'package="' '{ print $2 }' | cut -d'"' -f1 | tr -d '\\n'`, (error, stdout) => {
                if (error) {
                    spinner.fail(`Failed Retrieve App Name from ${filePath}`)
                    console.error(`bundletool dump manifest exec error: ${error}`);
                    reject()
                } else {
                    spinner.succeed(`Retrieved App Name:${stdout} from ${filePath}`)
                    resolve(stdout)
                }
            });
        }).catch(() => {
        });
    }
}