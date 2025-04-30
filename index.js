#!/usr/bin/env node

import {program} from "commander";
import AdbHelper from "./adbHelper.js"
import BundleToolHelper from "./bundle_tool_helper.js"

async function freshInstall(filePath) {
    await BundleToolHelper.cleanTempFiles(false);
    await AdbHelper.uninstallPackage(filePath);
    await BundleToolHelper.bundleTempApk(filePath);
    await BundleToolHelper.installTempApk();
    await BundleToolHelper.cleanTempFiles(true);
}

async function install(filePath) {
    await BundleToolHelper.cleanTempFiles(false);
    await BundleToolHelper.bundleTempApk(filePath);
    await BundleToolHelper.installTempApk();
    await BundleToolHelper.cleanTempFiles(true);
}

program
    .version("1.0.0")
    .description("Android AAB Installer");

program.command('install')
    .description('Install aab file')
    .argument('<string>', 'aab file')
    .option("-f, --freshInstall", "Do a Fresh Install", false)
    .action(async (file, options) => {
        if (options.freshInstall) {
            console.log("Do Fresh Install")
            await freshInstall(file)
        } else {
            console.log("Install On Top of Existing")
            await install(file)
        }
    })

program.parse(process.argv);