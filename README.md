# Coaf: mOre thAn difF

一款基于浏览器的局域网差异编辑器，可供多人使用。曾用名CodT。

依赖:
+ bootstrap
+ express
+ jquery
+ manaco-editor
+ popper.js
+ socket.io

启动程序后，访问 [http://localhost:3000/](http://localhost:3000) 使用服务.

## 已知BUG

+ 重启服务器端时请关闭所有正在使用的浏览器页面，否则无法启动。

## TODO

+ [ ] macOS端测试
+ [ ] 修BUG
+ [ ] 重构代码
+ [ ] ~~把README下面那一段英文翻译成中文然后再写一个英文的README~~
+ [ ] 多语言支持
+ [ ] ~~增加编译&运行功能~~

## 如何使用

### 推荐：从Release下载

|操作系统|版本|地址|
|:-:|:-:|:-:|
|Linux|v0.1.0(CodT)|[codt-linux](https://github.com/water-lift/codt/releases/download/v0.1.0/codt-linux)|
|macOS|v0.1.0(CodT)|[codt-macos](https://github.com/water-lift/codt/releases/download/v0.1.0/codt-macos)|
|Windows|v0.1.0(CodT)|[codt-win](https://github.com/water-lift/codt/releases/download/v0.1.0/codt-win.exe)|

**For Linux users**, we suggest you run the program in your terminal.

**For Windows users**, double-click the `exe` file will automatically open a terminal just like other terminal-based programs. You can stop the server by just closing the terminal window.

~~**For macOS users**, we don't really know what will happen because water\_lift has no money to buy a MacBook~~

### 构建（源码编译）

依赖环境：`nodejs`, `npm`

下载源代码，在源代码目录中依次执行
```bash
npm install
npm start
```

#### 构建可执行文件

使用 [pkg](https://github.com/zeit/pkg)。已在 `package.json` 中进行相关配置。