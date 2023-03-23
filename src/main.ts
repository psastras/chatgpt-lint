import yargs from "https://deno.land/x/yargs@v17.7.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.7.1-deno/deno-types.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";

await yargs(Deno.args)
  .command(
    "check <file>",
    "lint a particular file",
    (yargs: any) => {
      return yargs.positional("file", {
        describe: "path to the file to lint",
        type: "string",
      });
    },
    async (argv: Arguments) => {
      const fileContents = await Deno.readTextFile(argv.file);
      const apiKey = Deno.env.get("OPENAI_API_KEY")!;
      const openAI = new OpenAI(apiKey);

      const completion = await openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.1,
        messages: [
          {
            role: "user",
            content: `Analyze the file ${argv.file} and suggest any improvements. Output the suggestions in single line format: "{file_name} {row_number}:{column_number} {suggestion}" (ex. src/main.ts 5:10 hello world). Here are the file contents:
            ${fileContents}`,
          },
        ],
      });
      console.log(completion.choices[0].message.content);
    }
  )
  .strictCommands()
  .scriptName("chatgpt-lint")
  .help()
  .parse();
