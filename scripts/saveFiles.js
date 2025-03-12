const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// 프로젝트 루트 경로 구하기 (scripts 폴더의 상위 디렉토리)
const rootDir = path.resolve(__dirname, "..");

function saveFilesAsTxt(directory, outputFile) {
  const files = fs.readdirSync(directory);
  let outputContent = "";

  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      saveFilesAsTxt(fullPath, outputFile);
    } else if (
      file.endsWith(".js") ||
      file.endsWith(".ts") ||
      file.endsWith(".jsx") ||
      file.endsWith(".tsx")
    ) {
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      outputContent += `--- ${fullPath} ---\n${fileContent}\n\n`;
    }
  });

  fs.appendFileSync(outputFile, outputContent);
}

// 절대 경로로 src 디렉토리 지정
const srcDir = path.join(rootDir, "src");
// scripts 폴더에 출력 파일 지정
const contentOutputFile = path.join(__dirname, "client.txt");
const treeOutputFile = path.join(__dirname, "client-tree.txt");

// 내용 초기화
if (fs.existsSync(contentOutputFile)) {
  fs.writeFileSync(contentOutputFile, "");
}

// 파일 내용 저장
saveFilesAsTxt(srcDir, contentOutputFile);

// 트리 구조 저장 (절대 경로 사용)
execSync(`tree ${srcDir} > ${treeOutputFile}`);
