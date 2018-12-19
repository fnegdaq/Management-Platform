function encode_data(str) {
  var str = this.sha1(str);
  str = this.base64_encode(str)
  str = this.UrlEncode(str)
  return str;
}

function UrlEncode(clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9-_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
      output += match[1];
      x += match[1].length;

    } else {
      if (clearString.substr(x, 1) == ' ') {
        //原文在此用 clearString[x] == ' ' 做判断, 但ie不支持把字符串当作数组来访问, 
        //修改后两种浏览器都可兼容 
        output += '+';

      } else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}

function encodeUTF8(s) {
  var i, r = [],
    c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
      if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
        c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
          r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
      else r.push(0xE0 + (c >> 12 & 0xF));
      r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
  return r;
}

function sha1(s) {
  var da = this.encodeUTF8(s)
  var data = new Uint8Array(da)
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16,
    s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [],
    f = [
      function () {
        return m[1] & m[2] | ~m[1] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      },
      function () {
        return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      }
    ],
    rol = function (n, c) {
      return n << c | n >>> (32 - c);
    },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
        t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
        m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");

  return hex;
}

function base64_encode(str) {
  // 编码，配合encodeURIComponent使用
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var i = 0,
    len = str.length,
    strin = '';
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
      strin += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
      strin += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    strin += base64EncodeChars.charAt(c1 >> 2);
    strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    strin += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return strin
}

module.exports = {
  encode_data,
  UrlEncode,
  encodeUTF8,
  sha1,
  base64_encode
};