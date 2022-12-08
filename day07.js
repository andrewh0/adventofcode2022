const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

function parseInput() {
  const lines = input.split("\n");
  const commandGroups = [];
  let group = [];
  for (let line of lines) {
    if (line.includes("$ ")) {
      commandGroups.push(group);
      group = [];
    }
    group.push(line);
  }
  commandGroups.push(group);

  return commandGroups.slice(1);
}

function getTreeFromCommands(commandGroups) {
  let tree = {
    name: "root",
    dirs: [
      {
        parent: null,
        name: "/",
        files: [],
        dirs: [],
      },
    ],
  };
  let currentDirectory = tree;
  for (let commandGroup of commandGroups) {
    if (commandGroup[0].includes("$ cd ")) {
      const dir = commandGroup[0].split(" ")[2];
      if (dir === "..") {
        currentDirectory = currentDirectory.parent;
      } else {
        currentDirectory = currentDirectory.dirs.find((d) => d.name === dir);
      }
    } else if (commandGroup[0].includes("$ ls")) {
      const remaining = commandGroup.slice(1);
      for (let command of remaining) {
        if (command.includes("dir ")) {
          currentDirectory.dirs.push({
            parent: currentDirectory,
            name: command.slice(4),
            files: [],
            dirs: [],
          });
        } else {
          const [sizeStr, name] = command.split(" ");
          currentDirectory.files.push([parseInt(sizeStr), name]);
        }
      }
    }
  }
  return tree;
}

function traverseTree(tree, callback) {
  callback(tree);
  for (let subDir of tree.dirs) {
    traverseTree(subDir, callback);
  }
}

function getSubtreeSum(tree) {
  const fileSum = tree.files.reduce((acc, [size, _name]) => size + acc, 0);
  const subDirSum = tree.dirs.reduce(
    (acc, curr) => acc + getSubtreeSum(curr),
    0
  );

  const result = fileSum + subDirSum;
  tree.size = result;

  return result;
}

function part1() {
  const commandGroups = parseInput();
  const tree = getTreeFromCommands(commandGroups);
  const startDir = tree.dirs.find((d) => d.name === "/");

  getSubtreeSum(startDir);

  const smallDirs = [];
  traverseTree(startDir, (t) => {
    if (t.size <= 100000) {
      smallDirs.push(t.size);
    }
  });

  return smallDirs.reduce((acc, curr) => acc + curr, 0);
}

function part2() {
  const totalDiskSpace = 70_000_000;
  const neededUnusedSpace = 30_000_000;

  const commandGroups = parseInput();
  const tree = getTreeFromCommands(commandGroups);
  const startDir = tree.dirs.find((d) => d.name === "/");

  getSubtreeSum(startDir);
  const unusedSpace = totalDiskSpace - startDir.size;
  const additionalSpaceToDelete = neededUnusedSpace - unusedSpace;

  const eligibleDirs = [];
  traverseTree(startDir, (t) => {
    if (t.size >= additionalSpaceToDelete) {
      eligibleDirs.push(t.size);
    }
  });

  return eligibleDirs.reduce((acc, curr) => Math.min(acc, curr), Infinity);
}
