const ts = require("typescript"); // 3.8.3
console.log("TypeScript", ts.version);

class ServiceHost {
  constructor(name, content) {
    const compilerOptions = ts.getDefaultCompilerOptions();

    this.name = name;
    this.content = content;
    this.options = compilerOptions;

    this.getDefaultLibFileName = ts.getDefaultLibFileName;
  }

  getCurrentDirectory() {
    return process.cwd();
  }

  getCompilationSettings() {
    return this.options;
  }

  getScriptFileNames() {
    return [this.name];
  }

  getScriptVersion() {
    return ts.version;
  }

  getScriptSnapshot() {
    return ts.ScriptSnapshot.fromString(this.content);
  }
}

const fileName = "testfile.ts";
const text = `import {
  lstatSync,
  stat,
  statSync,
} from "fs";

lstatSync;
stat;
statSync;
`;

const languageService = ts.createLanguageService(new ServiceHost(fileName, text));
const fileChanges = languageService.organizeImports({ type: "file", fileName }, {})[0];
console.log("Text Changes", fileChanges.textChanges);
console.log("Failure?", fileChanges.textChanges[0].newText.includes("undefined") ? "YES" : "NO");
