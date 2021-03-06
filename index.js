// Generated by CoffeeScript 1.4.0
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $(document).on('ready', function() {
    var $charset_length_text, $charset_text, $entropy_slider, $entropy_text, $length_slider, $length_text, charset_text_value, entropy, get_password, rand_int, selected_charset, set_charset_length_text, set_charset_selector, set_charset_text, set_entropy, set_length, update_charset_length_text, update_charset_selector, update_charset_text, update_entropy;
    entropy = function(charset_size, length) {
      return length * (Math.log(charset_size) / Math.log(2));
    };
    /*
      Password Entropy Stuff
    */

    $entropy_slider = $('#entropy_slider_input');
    $entropy_text = $('#entropy_text_input');
    set_entropy = function(value) {
      var rounded;
      rounded = Math.round(value * 100) / 100;
      $entropy_text.val(rounded);
      return $entropy_slider.val(rounded);
    };
    update_entropy = function() {
      var charset_length, e, password_length;
      charset_length = charset_text_value().length;
      password_length = parseInt($length_text.val());
      e = entropy(charset_length, password_length);
      return set_entropy(e);
    };
    set_entropy('100');
    $entropy_slider.change(function() {
      return set_entropy($entropy_slider.val());
    });
    $entropy_text.change(function() {
      return set_entropy($entropy_slider.val());
    });
    /*
      Passowrd Length Stuff
    */

    $length_slider = $('#length_slider_input');
    $length_text = $('#length_text_input');
    set_length = function(value) {
      $length_text.val(value);
      return $length_slider.val(value);
    };
    set_length('20');
    $length_slider.change(function() {
      return set_length($length_slider.val());
    });
    $length_text.change(function() {
      return set_length($length_slider.val());
    });
    $('#length input').on('change keypress paste focus textInput input', update_entropy);
    /*
      Charset Stuff
    */

    $charset_text = $('#charset_text_input');
    $charset_length_text = $('#charset_length_text_input');
    charset_text_value = function() {
      var c, out;
      out = _.uniq((function() {
        var _i, _len, _ref, _results;
        _ref = $charset_text.val();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push(c);
        }
        return _results;
      })());
      return out;
    };
    set_charset_text = function(value) {
      $charset_text.val(value);
      update_charset_length_text();
      return update_entropy();
    };
    set_charset_length_text = function(length) {
      return $charset_length_text.val(length);
    };
    update_charset_length_text = function() {
      return set_charset_length_text(charset_text_value().length);
    };
    update_charset_length_text();
    selected_charset = function() {
      var el, _i, _len, _ref, _results;
      _ref = $('#charset_selector .char-checkbox-container :checked');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push($(el).val());
      }
      return _results;
    };
    update_charset_text = function() {
      return set_charset_text(selected_charset().join(''));
    };
    update_charset_text();
    set_charset_selector = function(chars) {
      return $(".char-checkbox").each(function() {
        var checked, _ref;
        checked = (_ref = $(this).val(), __indexOf.call(chars, _ref) >= 0);
        return $(this).prop('checked', checked);
      });
    };
    update_charset_selector = function() {
      return set_charset_selector(charset_text_value());
    };
    $charset_text.on('change keypress paste focus textInput input', function() {
      update_charset_length_text();
      return update_charset_selector();
    });
    $('#charset input').on('change keypress paste focus textInput input', update_entropy);
    $('.char-checkbox-container .checkbox').change(update_charset_text);
    $('.row-checkbox').change(function() {
      var checked;
      checked = $(this).prop('checked');
      $(this).parent().find('.char-checkbox-container .checkbox').each(function() {
        return $(this).prop('checked', checked);
      });
      return update_charset_text();
    });
    /*
      Password Generation
    */

    rand_int = function(max) {
      return Math.floor(Math.random() * max);
    };
    get_password = function() {
      var charset, charset_length, length, out, x;
      length = parseInt($length_text.val());
      charset = charset_text_value();
      charset_length = charset.length;
      out = (function() {
        var _i, _results;
        _results = [];
        for (x = _i = 0; 0 <= length ? _i < length : _i > length; x = 0 <= length ? ++_i : --_i) {
          _results.push(charset[rand_int(charset_length)]);
        }
        return _results;
      })();
      return out.join('');
    };
    return $('#generate').click(function() {
      return $('#generated_password').val(get_password());
    });
  });

}).call(this);
