$(function(){
    var socket = io();
    var inline = true;
    var editor;
    $('#cgd').click(function() {
        inline ^= 1;
        editor.updateOptions({
            renderSideBySide: inline
        });
    });
    require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
    require(['vs/editor/editor.main'], function() {
    	editor = monaco.editor.createDiffEditor(document.getElementById('container'), {enableSplitViewResizing: false});
        editor.setModel({
            original: monaco.editor.createModel(null, 'cpp'),
            modified: monaco.editor.createModel(null, 'cpp')
        });
        editor.getModifiedEditor().onDidChangeModelContent(function(e) {
            socket.emit('update', editor.getModifiedEditor().getValue());
        });
    });
    window.onresize = function () {
        editor.layout();
    };
    socket.on('update', function(content) {
        editor.getOriginalEditor().getModel().setValue(content);
    });
    socket.on('refresh', function() {
        socket.emit('update', editor.getModifiedEditor().getValue());
    });
    socket.on('loged', function() {
        $('#waiting').hide();
        $('#overlay').hide();
    });
    socket.on('fail', function(msg) {
        $('#msg').html(msg);
        $('#dialog').modal();
    });
    $('#join').click(function() {
        socket.emit('join', $('#name').val());
    });
});
