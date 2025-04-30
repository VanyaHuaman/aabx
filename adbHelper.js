import childProcess from 'child_process';
import ora from "ora";
import BundleHelper from './bundle_tool_helper.js';

export default class AdbHelper {

    static async uninstallPackage(filePath) {
        await new Promise(async (resolve, reject) => {
            const packageName = await BundleHelper.getPackageName(filePath)
            const isPackageInstalled = await this.isPackageInstalled(packageName)
            if (isPackageInstalled === 'true') {
                const spinner = ora(`Uninstalling ${packageName}`)
                spinner.start();
                spinner.color = 'green';
                if (packageName !== undefined) {
                    childProcess.exec(`adb uninstall ${packageName}`, (error, stdout) => {
                        if (error) {
                            spinner.fail(`Failed Uninstalling`)
                            console.error(`adb uninstall-apks error: ${error}`);
                            reject()
                        } else {
                            spinner.succeed(`Uninstalled App Name:${packageName}`)
                            resolve()
                        }
                    });
                } else {
                    console.log(`Package:${packageName}`)
                    reject()
                }
            } else {
                resolve()
            }
        }).catch(() => {
        });
    }

    static async isPackageInstalled(packageName) {
        return await new Promise(async (resolve, reject) => {
            childProcess.exec(`if [[ $(adb shell pm list packages -e | grep '${packageName}') ]]; 
            then 
                echo true | tr -d '\\n'
            else
                echo false | tr -d '\\n'
            fi`, (error, stdout) => {
                if (error) {
                    console.error(`adb shell pm exec error: ${error}`);
                    reject(false)
                } else {
                    resolve(stdout)
                }
            });
        }).catch(() => {
            console.error(`adb shell pm exception: ${error}`);
        });
    }
}