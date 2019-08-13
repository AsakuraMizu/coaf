OUT = out

.PHONY: excutables linux win macos
excutables: linux win macos

linux:
	pkg -t linux -o $(OUT)/codt-linux .

win:
	pkg -t win -o $(OUT)/codt-win .

macos:
	pkg -t macos -o $(OUT)/codt-macos .
