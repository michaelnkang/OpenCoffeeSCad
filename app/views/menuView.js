// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, MainMenuView, RecentFilesView, mainMenu_template, marionette, sF_template, _;
    $ = require('jquery');
    _ = require('underscore');
    marionette = require('marionette');
    require('bootstrap');
    mainMenu_template = require("text!templates/mainMenu.tmpl");
    sF_template = require("text!templates/menuFiles.tmpl");
    RecentFilesView = (function(_super) {

      __extends(RecentFilesView, _super);

      function RecentFilesView() {
        this.onRender = __bind(this.onRender, this);
        return RecentFilesView.__super__.constructor.apply(this, arguments);
      }

      RecentFilesView.prototype.template = sF_template;

      RecentFilesView.prototype.tagName = "li";

      RecentFilesView.prototype.onRender = function() {
        return this.$el.attr("id", this.model.get("name"));
      };

      return RecentFilesView;

    })(Backbone.Marionette.ItemView);
    MainMenuView = (function(_super) {

      __extends(MainMenuView, _super);

      MainMenuView.prototype.template = mainMenu_template;

      MainMenuView.prototype.tagName = "ul";

      MainMenuView.prototype.itemView = RecentFilesView;

      MainMenuView.prototype.itemViewContainer = "#recentFilesList";

      MainMenuView.prototype.triggers = {
        "mouseup .newFile": "file:new:mouseup",
        "mouseup .saveFile": "file:save:mouseup",
        "mouseup .saveFileAs": "file:saveas:mouseup",
        "mouseup .loadFile": "file:load:mouseup",
        "mouseup .newProject": "project:new:mouseup",
        "mouseup .settings": "settings:mouseup",
        "mouseup .undo": "file:undo:mouseup",
        "mouseup .redo": "file:redo:mouseup",
        "mouseup .parseCSG": "csg:parserender:mouseup",
        "mouseup .downloadStl": "download:stl:mouseup"
      };

      MainMenuView.prototype.events = {
        "mouseup .loadFileDirect": "requestFileLoad",
        "mouseup .showEditor": "showEditor"
      };

      MainMenuView.prototype.requestFileLoad = function(ev) {
        var fileName;
        fileName = $(ev.currentTarget).html();
        return this.app.vent.trigger("fileLoadRequest", fileName);
      };

      MainMenuView.prototype.showEditor = function(ev) {
        console.log("show editor1");
        return this.app.vent.trigger("editorShowRequest");
      };

      function MainMenuView(options) {
        this.showEditor = __bind(this.showEditor, this);

        this.requestFileLoad = __bind(this.requestFileLoad, this);

        var _this = this;
        MainMenuView.__super__.constructor.call(this, options);
        this.app = require('app');
        this.on("file:new:mouseup", function() {
          return _this.app.vent.trigger("fileNewRequest", _this);
        });
        this.on("file:undo:mouseup", function() {
          if (!$('#undoBtn').hasClass("disabled")) {
            return _this.app.vent.trigger("undoRequest", _this);
          }
        });
        this.on("file:redo:mouseup", function() {
          if (!$('#redoBtn').hasClass("disabled")) {
            return _this.app.vent.trigger("redoRequest", _this);
          }
        });
        this.on("csg:parserender:mouseup", function() {
          if (!$('#updateBtn').hasClass("disabled")) {
            return _this.app.vent.trigger("parseCsgRequest", _this);
          }
        });
        this.on("download:stl:mouseup", function() {
          if (!$('#exportStl').hasClass("disabled")) {
            return _this.app.vent.trigger("downloadStlRequest", _this);
          }
        });
        this.app.vent.bind("undoAvailable", function() {
          return $('#undoBtn').removeClass("disabled");
        });
        this.app.vent.bind("redoAvailable", function() {
          return $('#redoBtn').removeClass("disabled");
        });
        this.app.vent.bind("undoUnAvailable", function() {
          return $('#undoBtn').addClass("disabled");
        });
        this.app.vent.bind("redoUnAvailable", function() {
          return $('#redoBtn').addClass("disabled");
        });
        this.app.vent.bind("clearUndoRedo", function() {
          $('#undoBtn').addClass("disabled");
          return $('#redoBtn').addClass("disabled");
        });
        this.app.vent.bind("modelChanged", function() {
          $('#updateBtn').removeClass("disabled");
          return $('#exportStl').addClass("disabled");
        });
        this.app.vent.bind("parseCsgDone", function() {
          $('#updateBtn').addClass("disabled");
          return $('#exportStl').removeClass("disabled");
        });
        this.app.vent.bind("stlGenDone", function(blob) {
          var fileName, tmpLnk;
          tmpLnk = $("#exportStlLink");
          fileName = _this.app.project.get("name");
          tmpLnk.prop("download", "" + fileName + ".stl");
          return tmpLnk.prop("href", blob);
        });
      }

      return MainMenuView;

    })(marionette.CompositeView);
    return MainMenuView;
  });

}).call(this);
