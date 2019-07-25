$(function(){
    var socket = io();
    var inline = true;
    var editor;
    $('#cgd').click(function(){
        inline ^= 1;
        editor.updateOptions({
            renderSideBySide: inline
        });
    });
    require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
    require(['vs/editor/editor.main'], function() {
    	editor = monaco.editor.createDiffEditor(document.getElementById('container'), {enableSplitViewResizing: false});
        editor.setModel({
            original: monaco.editor.createModel("#include <iostream>\nint main()\n{\n\tstd::cout << \"Hello World!\" << std::endl;\n\treturn 0;\n}", 'cpp'),
            modified: monaco.editor.createModel("#include <iostream>\nusing namespace std;\nint main()\n{\n\tcout << \"Hello World!\" << endl;\n}", 'cpp')
        });
        editor.getModifiedEditor().onDidChangeModelContent(function(e){
            socket.emit('update', editor.getModifiedEditor().getValue());
        });
    });
    window.onresize = function () {
        editor.layout();
    };
    socket.on('update', function(msg) {
        editor.getOriginalEditor().getModel().setValue(msg);
    });
    socket.on('loged', function(msg) {
        $('#waiting').hide();
        $('#overlay').hide();
    });
    $('#join').click(function(){
        socket.emit('join', $('#name').val());
    });
});
