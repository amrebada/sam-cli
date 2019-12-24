import arg from 'arg';
import { startGenerate, listFiles, convertToFullpath } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
          '--help': Boolean,
          '--generate': String,
          '-g': '--generate',
          '-h': '--help',
        },
        {
          argv: rawArgs.slice(2),
        }
      );




      return {
        generate: args['--generate'],
        help: args['--help'] || false
      };
}

function printHelp() {
  console.log(`SAM CLI : Usage (sam --help)
  sam [option] <args>

  options:
      --generate, -g    generate an template for (domain)
`);
}





export async function cli(args) {
  
  let options ;
  try {
    options = parseArgumentsIntoOptions(args);
    if(!options.generate || options.help){
        printHelp();
    }
    const files = await listFiles(".");
    const fullfiles = await convertToFullpath(files);
    await startGenerate(fullfiles,options.generate);

  } catch (error){
    console.log(error.message);
    console.log("--------------------------");
    printHelp();
    return;
  }
  

  
 
  

}