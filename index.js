#!/usr/bin/env node

import { program } from "commander";
import AdbHelper  from "./adbHelper.js"
import BundleToolHelper from "./bundle_tool_helper.js"

program
  .version("1.0.0")
  .description("Android AAB Installer");

program.command('install')
    .description('Install aab file')
    .argument('<string>', 'aab file')
    .option("-f, --freshInstall", "Do a Fresh Install", false)
    .action(async (file, options) => {
        if(options.freshInstall) {
            console.log(`Running Fresh Install!\n ${file}`);
            BundleToolHelper.installAAB(file);
        } else {
            console.log(`Installing ontop of! ${file}`);
        }
    });

program.parse(process.argv);