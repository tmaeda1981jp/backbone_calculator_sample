/*jslint white:true, nomen:true, browser:true, devel:true, maxlen:120, */
/*global $:false, _:false, Backbone:false, define:false, require:false, */

define(['jquery', 'underscore'], function($, _) {
  'use strict';

  var template = (function() {
    var templateCache = [],
        cache = {},
        $tmpl = []
    ;

    return {

      /**
       * テンプレートファイルをロードします.
       * @param {String} url loadするtemplateファイル
       */
      load: function(url) {
        var dfd = $.Deferred();
        if (!_.include(templateCache, url)) {
          templateCache.push(url);
          $.ajax({
            url : url,
            dataType : 'text',
            async: true,
            success: function(response) {
              $.each($(response), function(i, v) {
                if (v && v.nodeName && v.nodeName === 'SCRIPT') {
                  $tmpl.push($(v));
                }
              });
              dfd.resolve($tmpl);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              dfd.reject();
            }
          });
        }
        return dfd.promise();
      },

      get: function(id) {
        if (!cache[id]) {
          $.each($tmpl, function(i,v) {
            if (v.attr('id') === id) {
              cache[id] = v;
              return false;
            }
            return true;
          });
        }
console.log($tmpl);
console.log(cache);
        return cache[id];
      } 
    };
  }());
  return template;
});
