import childProcess from 'child_process';
import ora from "ora";
import BundleHelper from './bundle_tool_helper.js';

export default class AdbHelper {

    static async uninstallPackage(filePath) {

        await new Promise(async (resolve, reject) => {
            const packageName = await BundleHelper.getPackageName(filePath)
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
        }).catch(() => {
        });
    }
}