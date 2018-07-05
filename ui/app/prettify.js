var editors = [];
$(document).ready(function() {
 var themeName =  "sunburst";
  var themes = ['doxy','desert','sunburst','sons-of-obsidian'];
  themes.forEach(function(theme){
    $('#themeSelection').append(`<option value="${theme}">${theme}</option>`);
    var fileref=document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", `/css/vendor/google-code-prettify/1.0.5/theme/${theme}.css/`);
    document.getElementsByTagName("head")[0].appendChild(fileref);
  });

  $('#themeSelection').change(function() {
    var selectCtrl = this;
    editors.forEach(function(editor) {
      var value = $(selectCtrl).val();
      editor.setOption("theme", value);
    });
  });

  var elementModeMapping = [
    {
      "elemId": "c-code",
      "mode": "text/x-csrc"
    },
    {
      "elemId": "cpp-code",
      "mode": "text/x-c++src"
    },
    {
      "elemId": "java-code",
      "mode": "text/x-java"
    },
    {
      "elemId": "csharp-code",
      "mode": "text/x-csharp"
    },
    {
      "elemId": "css-code",
      "mode": "text/css"
    }
  ];

  elementModeMapping.forEach(function(obj){
    var editor = CodeMirror.fromTextArea(document.getElementById(obj.elemId), {
      lineNumbers: true,
      matchBrackets: true,
      lineWrapping:true,
      theme:themeName,
      mode: obj.mode,
      clearOnEnter:true,
      styleSelectedText: true

    });
    $.getJSON(`${obj.elemId}.json`).done(function(payload) {
      var decode = atob(payload.content);
      editor.setValue(decode);
    });
      editors.push(editor);
  });

  var mac = CodeMirror.keyMap.default == CodeMirror.keyMap.macDefault;
  CodeMirror.keyMap.default[(mac ? "Cmd" : "Ctrl") + "-Space"] = "autocomplete";
  var selectbox = "";
      for(i = 1; i <= 66; i++){
        selectbox += '<option value ='+ i + '>' + i + '</option>'
        }
      $("#numselect").html(selectbox);
      $("#numselect").change(function(){
      $( "#numselect option:selected" ).each(function() {
          var lineNum = +$( this ).val();
          editors.forEach(function(editor){
          editor.markText({line:lineNum-1, ch:0}, {line:lineNum, ch:0},{className: "styled-background"});
          });
      });
      });
});