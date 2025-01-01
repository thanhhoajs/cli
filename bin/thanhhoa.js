#!/usr/bin/env node

const { execSync } = require("child_process");
const ora = require("ora");
const chalk = require("chalk");

const projectName = process.argv[3];
if (!projectName) {
  console.log(chalk.red("⚠️  Please specify the project name."));
  process.exit(1);
}

const repoUrl = "https://github.com/thanhhoajs/starter.git";

async function createProject() {
  console.log(
    chalk.cyan(
      `\n🚀 Creating new ThanhHoaJS project: ${chalk.bold(projectName)}\n`
    )
  );

  const stages = [
    {
      text: "Downloading starter template",
      cmd: `git clone --quiet --depth=1 ${repoUrl} ${projectName}`,
    },
    {
      text: "Setting up project",
      cmd: process.platform === "win32" ? "rmdir /s /q .git" : "rm -rf .git",
      cwd: projectName,
    },
    {
      text: "Installing dependencies",
      cmd: "bun install",
      cwd: projectName,
    },
  ];

  for (const stage of stages) {
    const spinner = ora(stage.text).start();
    try {
      execSync(stage.cmd, {
        stdio: ["ignore", "ignore", "pipe"],
        cwd: stage.cwd,
      });
      spinner.succeed();
    } catch (error) {
      spinner.fail();
      console.error(chalk.red("\nError: ") + error.message);
      process.exit(1);
    }
  }

  console.log(chalk.green("\n✨ Success!"), "Created", chalk.cyan(projectName));
  console.log("\nTo get started:");
  console.log(chalk.cyan(`\n  cd ${projectName}`));
  console.log(chalk.cyan("  bun dev\n"));
}

createProject().catch(console.error);
