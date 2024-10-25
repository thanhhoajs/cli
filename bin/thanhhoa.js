#!/usr/bin/env node

const { execSync } = require("child_process");

const projectName = process.argv[2];
if (!projectName) {
  console.error("Please specify the project name.");
  process.exit(1);
}

const repoUrl = "https://github.com/thanhhoajs/starter.git";
const command = `git clone --depth=1 ${repoUrl} ${projectName}`;

try {
  execSync(command, { stdio: "inherit" });
  process.chdir(projectName);

  setTimeout(() => {
    if (process.platform === "win32") {
      execSync("rmdir /s /q .git", { stdio: "inherit" });
    } else {
      execSync("rm -rf .git", { stdio: "inherit" });
    }
    console.log(`Project ${projectName} created successfully.`);
  }, 1000);
} catch (error) {
  console.error("Error creating project:", error);
  process.exit(1);
}
