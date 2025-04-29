#!/usr/bin/env node

import {program} from "commander";
import AdbHelper from "./adbHelper.js"
import BundleToolHelper from "./bundle_tool_helper.js"

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
            // TODO REMOVE APP INSTALLED ON DEVICE
            await BundleToolHelper.freshInstall(file)
        } else {
            console.log("Install On Top of Existing")
            await BundleToolHelper.freshInstall(file)
        }
    })

program.parse(process.argv);