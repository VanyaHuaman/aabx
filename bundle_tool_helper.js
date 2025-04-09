import childProcess from 'child_process';

export default class BundleToolHelper {
    static async installAAB(filePath) {
        childProcess.exec(`bundletool build-apks --bundle=${filePath} --output=app-temp.apks && bundletool install-apks --apks=app-temp.apks && rm ./app-temp.apks` , (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
          }) ;
    }
}